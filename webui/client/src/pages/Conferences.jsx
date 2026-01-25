import { useState, useEffect } from 'react'
import api from '../services/api'

export default function Conferences() {
  const [conferences, setConferences] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    extension: '',
    pin: '',
    adminPin: '',
    maxUsers: 10,
    record: false,
    announceUserCount: true,
    musicOnHold: true,
    enabled: true
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await api.get('/conferences')
      setConferences(response.data)
    } catch (error) {
      console.error('Erro ao carregar conferências:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/conferences/${editing.id}`, formData)
      } else {
        await api.post('/conferences', formData)
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
      pin: item.pin || '',
      adminPin: item.adminPin || '',
      maxUsers: item.maxUsers || 10,
      record: item.record || false,
      announceUserCount: item.announceUserCount !== false,
      musicOnHold: item.musicOnHold !== false,
      enabled: item.enabled !== false
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Excluir esta sala de conferência?')) return
    try {
      await api.delete(`/conferences/${id}`)
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
      pin: '',
      adminPin: '',
      maxUsers: 10,
      record: false,
      announceUserCount: true,
      musicOnHold: true,
      enabled: true
    })
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Salas de Conferência</h1>
        <button
          onClick={() => { resetForm(); setShowModal(true) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Nova Sala
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {conferences.map((conf) => (
          <div key={conf.id} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-lg">{conf.name}</h3>
                <p className="text-gray-500 text-sm">Ramal: {conf.extension}</p>
              </div>
              <span className={`px-2 py-1 text-xs rounded-full ${conf.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {conf.enabled ? 'Ativa' : 'Inativa'}
              </span>
            </div>
            <div className="space-y-1 text-sm text-gray-600 mb-3">
              <div className="flex justify-between">
                <span>Máx. Usuários:</span>
                <span className="font-medium">{conf.maxUsers}</span>
              </div>
              <div className="flex justify-between">
                <span>PIN:</span>
                <span className="font-mono">{conf.pin ? '****' : 'Sem PIN'}</span>
              </div>
              <div className="flex justify-between">
                <span>Gravar:</span>
                <span>{conf.record ? 'Sim' : 'Não'}</span>
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button onClick={() => handleEdit(conf)} className="text-blue-600 hover:text-blue-900 text-sm">
                Editar
              </button>
              <button onClick={() => handleDelete(conf.id)} className="text-red-600 hover:text-red-900 text-sm">
                Excluir
              </button>
            </div>
          </div>
        ))}
        {conferences.length === 0 && (
          <div className="col-span-full bg-white shadow rounded-lg p-8 text-center text-gray-500">
            Nenhuma sala de conferência cadastrada
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editing ? 'Editar Sala' : 'Nova Sala de Conferência'}
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
                <div>
                  <label className="block text-sm font-medium text-gray-700">PIN Usuário</label>
                  <input
                    type="text"
                    value={formData.pin}
                    onChange={(e) => setFormData({...formData, pin: e.target.value})}
                    placeholder="Opcional"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">PIN Admin</label>
                  <input
                    type="text"
                    value={formData.adminPin}
                    onChange={(e) => setFormData({...formData, adminPin: e.target.value})}
                    placeholder="Opcional"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Máx. Usuários</label>
                  <input
                    type="number"
                    min="2"
                    max="100"
                    value={formData.maxUsers}
                    onChange={(e) => setFormData({...formData, maxUsers: parseInt(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.record}
                    onChange={(e) => setFormData({...formData, record: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Gravar conferência</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.announceUserCount}
                    onChange={(e) => setFormData({...formData, announceUserCount: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Anunciar número de participantes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.musicOnHold}
                    onChange={(e) => setFormData({...formData, musicOnHold: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Música de espera</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.enabled}
                    onChange={(e) => setFormData({...formData, enabled: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Sala ativa</span>
                </label>
              </div>

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
