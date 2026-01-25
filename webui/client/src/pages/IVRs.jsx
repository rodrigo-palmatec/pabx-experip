import { useState, useEffect } from 'react'
import api from '../services/api'

export default function IVRs() {
  const [ivrs, setIvrs] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    extension: '',
    description: '',
    welcomeMessage: '',
    timeout: 10,
    maxRetries: 3,
    invalidMessage: '',
    timeoutDestination: '',
    invalidDestination: '',
    enabled: true,
    options: []
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await api.get('/ivrs')
      setIvrs(response.data)
    } catch (error) {
      console.error('Erro ao carregar IVRs:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/ivrs/${editing.id}`, formData)
      } else {
        await api.post('/ivrs', formData)
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
      name: item.name || '',
      extension: item.extension || '',
      description: item.description || '',
      welcomeMessage: item.welcomeMessage || '',
      timeout: item.timeout || 10,
      maxRetries: item.maxRetries || 3,
      invalidMessage: item.invalidMessage || '',
      timeoutDestination: item.timeoutDestination || '',
      invalidDestination: item.invalidDestination || '',
      enabled: item.enabled !== false,
      options: item.Options || []
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Excluir este IVR?')) return
    try {
      await api.delete(`/ivrs/${id}`)
      fetchData()
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao excluir')
    }
  }

  const resetForm = () => {
    setEditing(null)
    setFormData({
      name: '',
      extension: '',
      description: '',
      welcomeMessage: '',
      timeout: 10,
      maxRetries: 3,
      invalidMessage: '',
      timeoutDestination: '',
      invalidDestination: '',
      enabled: true,
      options: []
    })
  }

  const addOption = () => {
    setFormData(prev => ({
      ...prev,
      options: [...prev.options, { digit: '', destination: '', destinationType: 'extension' }]
    }))
  }

  const removeOption = (index) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }))
  }

  const updateOption = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => i === index ? { ...opt, [field]: value } : opt)
    }))
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">URA / IVR</h1>
        <button
          onClick={() => { resetForm(); setShowModal(true) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Nova URA
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {ivrs.map((ivr) => (
          <div key={ivr.id} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{ivr.name}</h3>
                <p className="text-gray-500 text-sm">Ramal: {ivr.extension}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${ivr.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {ivr.enabled ? 'Ativa' : 'Inativa'}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{ivr.description || 'Sem descrição'}</p>
            
            {ivr.Options?.length > 0 && (
              <div className="mb-3">
                <p className="text-xs text-gray-500 mb-1">Opções:</p>
                <div className="flex flex-wrap gap-1">
                  {ivr.Options.map((opt, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {opt.digit} → {opt.destination}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              <button onClick={() => handleEdit(ivr)} className="text-blue-600 hover:text-blue-900 text-sm">
                Editar
              </button>
              <button onClick={() => handleDelete(ivr.id)} className="text-red-600 hover:text-red-900 text-sm">
                Excluir
              </button>
            </div>
          </div>
        ))}
        {ivrs.length === 0 && (
          <div className="col-span-full bg-white shadow rounded-lg p-8 text-center text-gray-500">
            Nenhuma URA cadastrada
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editing ? 'Editar URA' : 'Nova URA'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ramal *</label>
                  <input
                    type="text"
                    required
                    value={formData.extension}
                    onChange={(e) => setFormData({...formData, extension: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Descrição</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Mensagem de Boas-vindas</label>
                  <input
                    type="text"
                    value={formData.welcomeMessage}
                    onChange={(e) => setFormData({...formData, welcomeMessage: e.target.value})}
                    placeholder="Caminho do arquivo de áudio"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Timeout (s)</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.timeout}
                    onChange={(e) => setFormData({...formData, timeout: parseInt(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Máx. Tentativas</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.maxRetries}
                    onChange={(e) => setFormData({...formData, maxRetries: parseInt(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Opções do Menu</label>
                  <button type="button" onClick={addOption} className="text-blue-600 text-sm hover:underline">
                    + Adicionar Opção
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.options.map((opt, idx) => (
                    <div key={idx} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                      <input
                        type="text"
                        value={opt.digit}
                        onChange={(e) => updateOption(idx, 'digit', e.target.value)}
                        placeholder="Dígito"
                        className="w-20 rounded-md border-gray-300 text-sm"
                      />
                      <select
                        value={opt.destinationType}
                        onChange={(e) => updateOption(idx, 'destinationType', e.target.value)}
                        className="rounded-md border-gray-300 text-sm"
                      >
                        <option value="extension">Ramal</option>
                        <option value="queue">Fila</option>
                        <option value="ivr">URA</option>
                        <option value="voicemail">Voicemail</option>
                        <option value="hangup">Desligar</option>
                      </select>
                      <input
                        type="text"
                        value={opt.destination}
                        onChange={(e) => updateOption(idx, 'destination', e.target.value)}
                        placeholder="Destino"
                        className="flex-1 rounded-md border-gray-300 text-sm"
                      />
                      <button type="button" onClick={() => removeOption(idx)} className="text-red-600 hover:text-red-900">
                        ×
                      </button>
                    </div>
                  ))}
                  {formData.options.length === 0 && (
                    <p className="text-gray-500 text-sm text-center py-4">Nenhuma opção configurada</p>
                  )}
                </div>
              </div>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.enabled}
                  onChange={(e) => setFormData({...formData, enabled: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2 text-sm">URA ativa</span>
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
    </div>
  )
}
