import { useState, useEffect } from 'react'
import api from '../services/api'

export default function Profiles() {
  const [profiles, setProfiles] = useState([])
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    routeIds: []
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [profilesRes, routesRes] = await Promise.all([
        api.get('/profiles'),
        api.get('/outboundRoutes')
      ])
      setProfiles(profilesRes.data)
      setRoutes(routesRes.data)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/profiles/${editing.id}`, formData)
      } else {
        await api.post('/profiles', formData)
      }
      setShowModal(false)
      resetForm()
      fetchData()
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao salvar perfil')
    }
  }

  const handleEdit = (profile) => {
    setEditing(profile)
    setFormData({
      name: profile.name || '',
      description: profile.description || '',
      routeIds: profile.OutboundRoutes?.map(r => r.id) || []
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Excluir este perfil?')) return
    try {
      await api.delete(`/profiles/${id}`)
      fetchData()
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao excluir')
    }
  }

  const resetForm = () => {
    setEditing(null)
    setFormData({ name: '', description: '', routeIds: [] })
  }

  const toggleRoute = (routeId) => {
    setFormData(prev => ({
      ...prev,
      routeIds: prev.routeIds.includes(routeId)
        ? prev.routeIds.filter(id => id !== routeId)
        : [...prev.routeIds, routeId]
    }))
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Perfis de Discagem</h1>
        <button
          onClick={() => { resetForm(); setShowModal(true) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Novo Perfil
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {profiles.map((profile) => (
          <div key={profile.id} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{profile.name}</h3>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(profile)} className="text-blue-600 hover:text-blue-900 text-sm">
                  Editar
                </button>
                <button onClick={() => handleDelete(profile.id)} className="text-red-600 hover:text-red-900 text-sm">
                  Excluir
                </button>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-3">{profile.description || 'Sem descrição'}</p>
            <div className="text-sm">
              <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                {profile.OutboundRoutes?.length || 0} rotas permitidas
              </span>
            </div>
            {profile.OutboundRoutes?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {profile.OutboundRoutes.slice(0, 3).map(route => (
                  <span key={route.id} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {route.name}
                  </span>
                ))}
                {profile.OutboundRoutes.length > 3 && (
                  <span className="text-gray-500 text-xs">+{profile.OutboundRoutes.length - 3} mais</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editing ? 'Editar Perfil' : 'Novo Perfil'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Rotas de Saída Permitidas</label>
                <div className="border rounded-md max-h-48 overflow-y-auto p-2 space-y-1">
                  {routes.length === 0 ? (
                    <p className="text-gray-500 text-sm p-2">Nenhuma rota de saída cadastrada</p>
                  ) : (
                    routes.map(route => (
                      <label key={route.id} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.routeIds.includes(route.id)}
                          onChange={() => toggleRoute(route.id)}
                          className="rounded border-gray-300 text-blue-600"
                        />
                        <span className="ml-2">{route.name} - {route.pattern}</span>
                      </label>
                    ))
                  )}
                </div>
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
