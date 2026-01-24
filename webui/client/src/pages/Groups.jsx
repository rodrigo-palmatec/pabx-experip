import { useState, useEffect } from 'react'
import api from '../services/api'

export default function Groups() {
  const [groups, setGroups] = useState([])
  const [peers, setPeers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingGroup, setEditingGroup] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ringStrategy: 'ringall',
    ringTime: 20,
    peerIds: []
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [groupsRes, peersRes] = await Promise.all([
        api.get('/groups'),
        api.get('/peers')
      ])
      setGroups(groupsRes.data)
      setPeers(peersRes.data)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingGroup) {
        await api.put(`/groups/${editingGroup.id}`, formData)
      } else {
        await api.post('/groups', formData)
      }
      setShowModal(false)
      resetForm()
      fetchData()
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao salvar grupo')
    }
  }

  const handleEdit = (group) => {
    setEditingGroup(group)
    setFormData({
      name: group.name || '',
      description: group.description || '',
      ringStrategy: group.ringStrategy || 'ringall',
      ringTime: group.ringTime || 20,
      peerIds: group.Peers?.map(p => p.id) || []
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir este grupo?')) return
    try {
      await api.delete(`/groups/${id}`)
      fetchData()
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao excluir grupo')
    }
  }

  const resetForm = () => {
    setEditingGroup(null)
    setFormData({
      name: '',
      description: '',
      ringStrategy: 'ringall',
      ringTime: 20,
      peerIds: []
    })
  }

  const togglePeer = (peerId) => {
    setFormData(prev => ({
      ...prev,
      peerIds: prev.peerIds.includes(peerId)
        ? prev.peerIds.filter(id => id !== peerId)
        : [...prev.peerIds, peerId]
    }))
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Grupos de Ramais</h1>
        <button
          onClick={() => { resetForm(); setShowModal(true) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Novo Grupo
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div key={group.id} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-lg">{group.name}</h3>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(group)} className="text-blue-600 hover:text-blue-900 text-sm">
                  Editar
                </button>
                <button onClick={() => handleDelete(group.id)} className="text-red-600 hover:text-red-900 text-sm">
                  Excluir
                </button>
              </div>
            </div>
            <p className="text-gray-500 text-sm mb-3">{group.description || 'Sem descrição'}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Estratégia: {group.ringStrategy}</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                {group.Peers?.length || 0} ramais
              </span>
            </div>
            {group.Peers?.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {group.Peers.slice(0, 5).map(peer => (
                  <span key={peer.id} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                    {peer.username}
                  </span>
                ))}
                {group.Peers.length > 5 && (
                  <span className="text-gray-500 text-xs">+{group.Peers.length - 5} mais</span>
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
              {editingGroup ? 'Editar Grupo' : 'Novo Grupo'}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estratégia de Toque</label>
                  <select
                    value={formData.ringStrategy}
                    onChange={(e) => setFormData({...formData, ringStrategy: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="ringall">Todos ao mesmo tempo</option>
                    <option value="hunt">Sequencial</option>
                    <option value="memoryhunt">Sequencial c/ memória</option>
                    <option value="firstavailable">Primeiro disponível</option>
                    <option value="random">Aleatório</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tempo de Toque (s)</label>
                  <input
                    type="number"
                    min="5"
                    value={formData.ringTime}
                    onChange={(e) => setFormData({...formData, ringTime: parseInt(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Membros do Grupo</label>
                <div className="border rounded-md max-h-48 overflow-y-auto p-2 space-y-1">
                  {peers.map(peer => (
                    <label key={peer.id} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.peerIds.includes(peer.id)}
                        onChange={() => togglePeer(peer.id)}
                        className="rounded border-gray-300 text-blue-600"
                      />
                      <span className="ml-2">{peer.username} - {peer.name}</span>
                    </label>
                  ))}
                </div>
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
