import { useState, useEffect } from 'react'
import api from '../services/api'

export default function Categories() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    nat: true,
    voicemail: true,
    lock: false,
    followme: false,
    passwordCall: false,
    monitor: 'none',
    callLimit: 1,
    timeout: 60,
    timeRestrictionStart: '',
    timeRestrictionEnd: '',
    overflowExtension: ''
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories')
      setCategories(response.data)
    } catch (error) {
      console.error('Erro ao carregar categorias:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingCategory) {
        await api.put(`/categories/${editingCategory.id}`, formData)
      } else {
        await api.post('/categories', formData)
      }
      setShowModal(false)
      resetForm()
      fetchCategories()
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao salvar categoria')
    }
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name || '',
      description: category.description || '',
      nat: category.nat ?? true,
      voicemail: category.voicemail ?? true,
      lock: category.lock || false,
      followme: category.followme || false,
      passwordCall: category.passwordCall || false,
      monitor: category.monitor || 'none',
      callLimit: category.callLimit || 1,
      timeout: category.timeout || 60,
      timeRestrictionStart: category.timeRestrictionStart || '',
      timeRestrictionEnd: category.timeRestrictionEnd || '',
      overflowExtension: category.overflowExtension || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return
    try {
      await api.delete(`/categories/${id}`)
      fetchCategories()
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao excluir categoria')
    }
  }

  const resetForm = () => {
    setEditingCategory(null)
    setFormData({
      name: '',
      description: '',
      nat: true,
      voicemail: true,
      lock: false,
      followme: false,
      passwordCall: false,
      monitor: 'none',
      callLimit: 1,
      timeout: 60,
      timeRestrictionStart: '',
      timeRestrictionEnd: '',
      overflowExtension: ''
    })
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Categorias</h1>
        <button
          onClick={() => { resetForm(); setShowModal(true) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Nova Categoria
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Descrição</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Limite</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timeout</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Monitor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ramais</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{category.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500">{category.description || '-'}</td>
                <td className="px-6 py-4 whitespace-nowrap">{category.callLimit}</td>
                <td className="px-6 py-4 whitespace-nowrap">{category.timeout}s</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    category.monitor === 'all' ? 'bg-green-100 text-green-800' :
                    category.monitor === 'none' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {category.monitor}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{category.Peers?.length || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button onClick={() => handleEdit(category)} className="text-blue-600 hover:text-blue-900 mr-3">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(category.id)} className="text-red-600 hover:text-red-900">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
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
                  <label className="block text-sm font-medium text-gray-700">Descrição</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Limite de Chamadas</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.callLimit}
                    onChange={(e) => setFormData({...formData, callLimit: parseInt(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Timeout (segundos)</label>
                  <input
                    type="number"
                    min="5"
                    value={formData.timeout}
                    onChange={(e) => setFormData({...formData, timeout: parseInt(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Monitoramento</label>
                  <select
                    value={formData.monitor}
                    onChange={(e) => setFormData({...formData, monitor: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="none">Nenhum</option>
                    <option value="all">Todas</option>
                    <option value="in">Entrada</option>
                    <option value="out">Saída</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ramal Transbordo</label>
                  <input
                    type="text"
                    value={formData.overflowExtension}
                    onChange={(e) => setFormData({...formData, overflowExtension: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Restrição Início</label>
                  <input
                    type="time"
                    value={formData.timeRestrictionStart}
                    onChange={(e) => setFormData({...formData, timeRestrictionStart: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Restrição Fim</label>
                  <input
                    type="time"
                    value={formData.timeRestrictionEnd}
                    onChange={(e) => setFormData({...formData, timeRestrictionEnd: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.nat}
                    onChange={(e) => setFormData({...formData, nat: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="ml-2 text-sm">NAT</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.voicemail}
                    onChange={(e) => setFormData({...formData, voicemail: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Voicemail</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.lock}
                    onChange={(e) => setFormData({...formData, lock: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Bloqueio</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.followme}
                    onChange={(e) => setFormData({...formData, followme: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Follow-me</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.passwordCall}
                    onChange={(e) => setFormData({...formData, passwordCall: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Senha para Ligar</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
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
