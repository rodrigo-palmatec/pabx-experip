import { useState, useEffect } from 'react'
import api from '../services/api'

export default function Queues() {
  const [queues, setQueues] = useState([])
  const [peers, setPeers] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingQueue, setEditingQueue] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    extension: '',
    description: '',
    strategy: 'ringall',
    timeout: 30,
    maxWaitTime: 300,
    wrapupTime: 0,
    announceFrequency: 60,
    mohClass: 'default',
    memberIds: [],
    enabled: true,
    callCenter: false,
    monitor: 'none',
    serviceHourId: '',
    overflowDestType: 'hangup',
    overflowDestId: '',
    overflowDestData: ''
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [queuesRes, peersRes] = await Promise.all([
        api.get('/queues'),
        api.get('/peers')
      ])
      setQueues(queuesRes.data)
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
      if (editingQueue) {
        await api.put(`/queues/${editingQueue.id}`, formData)
      } else {
        await api.post('/queues', formData)
      }
      setShowModal(false)
      resetForm()
      fetchData()
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao salvar fila')
    }
  }

  const handleEdit = (queue) => {
    setEditingQueue(queue)
    setFormData({
      name: queue.name || '',
      extension: queue.extension || '',
      description: queue.description || '',
      strategy: queue.strategy || 'ringall',
      timeout: queue.timeout || 30,
      maxWaitTime: queue.maxWaitTime || 300,
      wrapupTime: queue.wrapupTime || 0,
      announceFrequency: queue.announceFrequency || 60,
      mohClass: queue.mohClass || 'default',
      memberIds: queue.Members?.map(m => m.peerId) || [],
      enabled: queue.enabled !== false,
      callCenter: queue.callCenter || false,
      monitor: queue.monitor || 'none',
      serviceHourId: queue.serviceHourId || '',
      overflowDestType: queue.overflowDestType || 'hangup',
      overflowDestId: queue.overflowDestId || '',
      overflowDestData: queue.overflowDestData || ''
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir esta fila?')) return
    try {
      await api.delete(`/queues/${id}`)
      fetchData()
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao excluir fila')
    }
  }

  const resetForm = () => {
    setEditingQueue(null)
    setFormData({
      name: '',
      extension: '',
      description: '',
      strategy: 'ringall',
      timeout: 30,
      maxWaitTime: 300,
      wrapupTime: 0,
      announceFrequency: 60,
      mohClass: 'default',
      memberIds: [],
      enabled: true,
      callCenter: false,
      monitor: 'none',
      serviceHourId: '',
      overflowDestType: 'hangup',
      overflowDestId: '',
      overflowDestData: ''
    })
  }

  const toggleMember = (peerId) => {
    setFormData(prev => ({
      ...prev,
      memberIds: prev.memberIds.includes(peerId)
        ? prev.memberIds.filter(id => id !== peerId)
        : [...prev.memberIds, peerId]
    }))
  }

  const strategyLabels = {
    ringall: 'Todos ao mesmo tempo',
    leastrecent: 'Menos recente',
    fewestcalls: 'Menos chamadas',
    random: 'Aleatório',
    rrmemory: 'Round Robin',
    linear: 'Linear',
    wrandom: 'Aleatório ponderado'
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Filas de Atendimento</h1>
        <button
          onClick={() => { resetForm(); setShowModal(true) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Nova Fila
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ramal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estratégia</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timeout</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Membros</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {queues.map((queue) => (
              <tr key={queue.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{queue.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{queue.extension}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {strategyLabels[queue.strategy] || queue.strategy}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{queue.timeout}s</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                    {queue.Members?.length || 0} agentes
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button onClick={() => handleEdit(queue)} className="text-blue-600 hover:text-blue-900 mr-3">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(queue.id)} className="text-red-600 hover:text-red-900">
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
              {editingQueue ? 'Editar Fila' : 'Nova Fila'}
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
                  <label className="block text-sm font-medium text-gray-700">Estratégia</label>
                  <select
                    value={formData.strategy}
                    onChange={(e) => setFormData({...formData, strategy: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    {Object.entries(strategyLabels).map(([key, label]) => (
                      <option key={key} value={key}>{label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Timeout (s)</label>
                  <input
                    type="number"
                    min="5"
                    value={formData.timeout}
                    onChange={(e) => setFormData({...formData, timeout: parseInt(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tempo Máx. Espera (s)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.maxWaitTime}
                    onChange={(e) => setFormData({...formData, maxWaitTime: parseInt(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Wrapup Time (s)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.wrapupTime}
                    onChange={(e) => setFormData({...formData, wrapupTime: parseInt(e.target.value)})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gravação</label>
                  <select
                    value={formData.monitor}
                    onChange={(e) => setFormData({...formData, monitor: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="none">Não gravar</option>
                    <option value="all">Gravar todas</option>
                    <option value="external">Apenas externas</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Transbordo</label>
                  <select
                    value={formData.overflowDestType}
                    onChange={(e) => setFormData({...formData, overflowDestType: e.target.value, overflowDestId: '', overflowDestData: ''})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="hangup">Desligar</option>
                    <option value="queue">Outra Fila</option>
                    <option value="ivr">URA</option>
                    <option value="peer">Ramal</option>
                    <option value="external">Número Externo</option>
                  </select>
                </div>
                {formData.overflowDestType === 'external' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Número Externo</label>
                    <input
                      type="text"
                      value={formData.overflowDestData}
                      onChange={(e) => setFormData({...formData, overflowDestData: e.target.value})}
                      placeholder="Ex: 11999999999"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.enabled}
                    onChange={(e) => setFormData({...formData, enabled: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Habilitada</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.callCenter}
                    onChange={(e) => setFormData({...formData, callCenter: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600"
                  />
                  <span className="ml-2 text-sm">Fila Call Center</span>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Agentes da Fila</label>
                <div className="border rounded-md max-h-48 overflow-y-auto p-2 space-y-1">
                  {peers.map(peer => (
                    <label key={peer.id} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.memberIds.includes(peer.id)}
                        onChange={() => toggleMember(peer.id)}
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
