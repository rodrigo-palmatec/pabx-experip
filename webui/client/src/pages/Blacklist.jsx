import { useState, useEffect, useRef } from 'react'
import { Ban, Plus, Upload, Download, Search, Trash2, Edit2, AlertCircle } from 'lucide-react'
import api from '../services/api'

export default function Blacklist() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [importText, setImportText] = useState('')
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)
  const [formData, setFormData] = useState({
    number: '',
    description: '',
    type: 'inbound',
    enabled: true
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await api.get('/blacklist')
      setItems(response.data)
    } catch (error) {
      console.error('Erro ao carregar blacklist:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/blacklist/${editing.id}`, formData)
      } else {
        await api.post('/blacklist', formData)
      }
      setShowModal(false)
      resetForm()
      fetchData()
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao salvar')
    }
  }

  const handleEdit = (item) => {
    setEditing(item)
    setFormData({
      number: item.number || '',
      description: item.description || '',
      type: item.type || 'inbound',
      enabled: item.enabled !== false
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Remover este número da blacklist?')) return
    try {
      await api.delete(`/blacklist/${id}`)
      fetchData()
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao remover')
    }
  }

  const resetForm = () => {
    setEditing(null)
    setFormData({
      number: '',
      description: '',
      type: 'inbound',
      enabled: true
    })
  }

  const typeLabels = {
    inbound: 'Entrada',
    outbound: 'Saída',
    both: 'Ambos'
  }

  // Filtrar items
  const filteredItems = items.filter(item => {
    const matchesSearch = item.number.includes(search) || 
                          (item.description && item.description.toLowerCase().includes(search.toLowerCase()))
    const matchesType = filterType === 'all' || item.type === filterType
    return matchesSearch && matchesType
  })

  // Export para CSV
  const handleExport = () => {
    const csv = ['numero,descricao,tipo,ativo']
    items.forEach(item => {
      csv.push(`${item.number},"${item.description || ''}",${item.type},${item.enabled}`)
    })
    const blob = new Blob([csv.join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `blacklist_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Import de números
  const handleImport = async () => {
    const lines = importText.split('\n').filter(l => l.trim())
    if (lines.length === 0) {
      setError('Nenhum número para importar')
      return
    }

    let imported = 0
    let errors = 0

    for (const line of lines) {
      const parts = line.split(',').map(p => p.trim().replace(/"/g, ''))
      const number = parts[0]
      if (!number) continue

      try {
        await api.post('/blacklist', {
          number,
          description: parts[1] || 'Importado',
          type: parts[2] || 'inbound',
          enabled: true
        })
        imported++
      } catch {
        errors++
      }
    }

    setShowImportModal(false)
    setImportText('')
    fetchData()
    alert(`Importação concluída: ${imported} adicionados, ${errors} erros`)
  }

  // Upload de arquivo
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    const reader = new FileReader()
    reader.onload = (ev) => {
      setImportText(ev.target.result)
    }
    reader.readAsText(file)
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blacklist</h1>
          <p className="text-gray-500">Gerenciar números bloqueados</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowImportModal(true)}
            className="btn-secondary flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Importar
          </button>
          <button
            onClick={handleExport}
            className="btn-secondary flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Exportar
          </button>
          <button
            onClick={() => { resetForm(); setShowModal(true) }}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por número ou descrição..."
            className="input pl-10"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="input w-auto"
        >
          <option value="all">Todos os tipos</option>
          <option value="inbound">Entrada</option>
          <option value="outbound">Saída</option>
          <option value="both">Ambos</option>
        </select>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="text-2xl font-bold text-gray-800">{items.length}</div>
          <div className="text-sm text-gray-500">Total bloqueados</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="text-2xl font-bold text-red-600">{items.filter(i => i.enabled).length}</div>
          <div className="text-sm text-gray-500">Ativos</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="text-2xl font-bold text-gray-400">{items.filter(i => !i.enabled).length}</div>
          <div className="text-sm text-gray-500">Inativos</div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Número</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tipo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <Ban className="w-4 h-4 text-red-500" />
                    <span className="font-medium">{item.number}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.description || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                    {typeLabels[item.type] || item.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${item.enabled ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                    {item.enabled ? 'Bloqueado' : 'Inativo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => handleEdit(item)} 
                      className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(item.id)} 
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredItems.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                  {items.length === 0 ? 'Nenhum número na blacklist' : 'Nenhum resultado encontrado'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editing ? 'Editar' : 'Adicionar à Blacklist'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Número *</label>
                <input
                  type="text"
                  required
                  value={formData.number}
                  onChange={(e) => setFormData({...formData, number: e.target.value})}
                  placeholder="Ex: 11999999999"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Descrição</label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Motivo do bloqueio"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo de Bloqueio</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="inbound">Chamadas de Entrada</option>
                  <option value="outbound">Chamadas de Saída</option>
                  <option value="both">Ambas</option>
                </select>
              </div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.enabled}
                  onChange={(e) => setFormData({...formData, enabled: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2">Bloqueio ativo</span>
              </label>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Importação */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Importar Números</h2>
            
            <div className="space-y-4">
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".csv,.txt"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-500 hover:bg-primary-50 transition-colors"
                >
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600">Clique para carregar arquivo CSV</p>
                  <p className="text-xs text-gray-400 mt-1">ou cole os números abaixo</p>
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Números (um por linha ou separados por vírgula)
                </label>
                <textarea
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder="11999999999&#10;11888888888,Spam&#10;11777777777,Telemarketing,inbound"
                  rows={8}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Formato: número,descrição,tipo (inbound/outbound/both)
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => { setShowImportModal(false); setImportText('') }} 
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button 
                  onClick={handleImport}
                  disabled={!importText.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  Importar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
