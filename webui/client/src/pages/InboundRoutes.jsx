import { useState, useEffect } from 'react'
import api from '../services/api'

export default function InboundRoutes() {
  const [routes, setRoutes] = useState([])
  const [serviceHours, setServiceHours] = useState([])
  const [queues, setQueues] = useState([])
  const [ivrs, setIvrs] = useState([])
  const [peers, setPeers] = useState([])
  const [trunks, setTrunks] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    did: '',
    cidPattern: '',
    destinationType: 'peer',
    destinationId: '',
    destinationData: '',
    serviceHourId: '',
    outOfServiceDestType: 'hangup',
    outOfServiceDestId: '',
    outOfServiceDestData: '',
    priority: 0,
    enabled: true
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [routesRes, serviceHoursRes, queuesRes, ivrsRes, peersRes, trunksRes] = await Promise.all([
        api.get('/inboundRoutes'),
        api.get('/serviceHours'),
        api.get('/queues'),
        api.get('/ivrs'),
        api.get('/peers'),
        api.get('/trunks')
      ])
      setRoutes(routesRes.data)
      setServiceHours(serviceHoursRes.data)
      setQueues(queuesRes.data)
      setIvrs(ivrsRes.data)
      setPeers(peersRes.data)
      setTrunks(trunksRes.data)
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
        await api.put(`/inboundRoutes/${editing.id}`, formData)
      } else {
        await api.post('/inboundRoutes', formData)
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
      did: item.did || '',
      cidPattern: item.cidPattern || '',
      destinationType: item.destinationType || 'peer',
      destinationId: item.destinationId || '',
      destinationData: item.destinationData || '',
      serviceHourId: item.serviceHourId || '',
      outOfServiceDestType: item.outOfServiceDestType || 'hangup',
      outOfServiceDestId: item.outOfServiceDestId || '',
      outOfServiceDestData: item.outOfServiceDestData || '',
      priority: item.priority || 0,
      enabled: item.enabled !== false
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Excluir esta rota de entrada?')) return
    try {
      await api.delete(`/inboundRoutes/${id}`)
      fetchData()
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao excluir')
    }
  }

  const resetForm = () => {
    setEditing(null)
    setFormData({
      name: '',
      did: '',
      cidPattern: '',
      destinationType: 'peer',
      destinationId: '',
      destinationData: '',
      serviceHourId: '',
      outOfServiceDestType: 'hangup',
      outOfServiceDestId: '',
      outOfServiceDestData: '',
      priority: 0,
      enabled: true
    })
  }

  const renderDestinationSelect = (type, value, onChange, prefix = '') => {
    switch (type) {
      case 'peer':
        return (
          <select value={value} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione um ramal</option>
            {peers.map(p => <option key={p.id} value={p.id}>{p.username} - {p.name}</option>)}
          </select>
        )
      case 'queue':
        return (
          <select value={value} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione uma fila</option>
            {queues.map(q => <option key={q.id} value={q.id}>{q.name}</option>)}
          </select>
        )
      case 'ivr':
        return (
          <select value={value} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione uma URA</option>
            {ivrs.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
          </select>
        )
      case 'external':
        return (
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Número externo"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        )
      case 'voicemail':
        return (
          <select value={value} onChange={onChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
            <option value="">Selecione um ramal</option>
            {peers.map(p => <option key={p.id} value={p.id}>{p.username} - {p.name}</option>)}
          </select>
        )
      default:
        return null
    }
  }

  const destinationTypes = {
    peer: 'Ramal',
    queue: 'Fila',
    ivr: 'URA',
    group: 'Grupo',
    conference: 'Conferência',
    voicemail: 'Voicemail',
    external: 'Número Externo',
    hangup: 'Desligar'
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Rotas de Entrada</h1>
        <button
          onClick={() => { resetForm(); setShowModal(true) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Nova Rota
        </button>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">DID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destino</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Horário</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {routes.map((route) => (
              <tr key={route.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium">{route.name}</td>
                <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">{route.did || 'Qualquer'}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm">
                    {destinationTypes[route.destinationType] || route.destinationType}: {route.destination}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">
                  {route.ServiceHour?.name || 'Sempre'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${route.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                    {route.enabled ? 'Ativa' : 'Inativa'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <button onClick={() => handleEdit(route)} className="text-blue-600 hover:text-blue-900 mr-3">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(route.id)} className="text-red-600 hover:text-red-900">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
            {routes.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                  Nenhuma rota de entrada cadastrada
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editing ? 'Editar Rota' : 'Nova Rota de Entrada'}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">DID (Número Recebido)</label>
                  <input
                    type="text"
                    value={formData.did}
                    onChange={(e) => setFormData({...formData, did: e.target.value})}
                    placeholder="Deixe vazio para qualquer"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Padrão CID</label>
                  <input
                    type="text"
                    value={formData.cidPattern}
                    onChange={(e) => setFormData({...formData, cidPattern: e.target.value})}
                    placeholder="Filtro de origem"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-3">Destino Principal</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo</label>
                    <select
                      value={formData.destinationType}
                      onChange={(e) => setFormData({...formData, destinationType: e.target.value, destinationId: '', destinationData: ''})}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      {Object.entries(destinationTypes).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                  {formData.destinationType !== 'hangup' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Destino</label>
                      {formData.destinationType === 'external' ? (
                        <input
                          type="text"
                          value={formData.destinationData}
                          onChange={(e) => setFormData({...formData, destinationData: e.target.value})}
                          placeholder="Número externo"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        />
                      ) : (
                        renderDestinationSelect(
                          formData.destinationType, 
                          formData.destinationId,
                          (e) => setFormData({...formData, destinationId: e.target.value})
                        )
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-3">Fora do Horário</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Horário de Atendimento</label>
                  <select
                    value={formData.serviceHourId}
                    onChange={(e) => setFormData({...formData, serviceHourId: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Sempre disponível</option>
                    {serviceHours.map(sh => (
                      <option key={sh.id} value={sh.id}>{sh.name}</option>
                    ))}
                  </select>
                </div>
                {formData.serviceHourId && (
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tipo</label>
                      <select
                        value={formData.outOfServiceDestType}
                        onChange={(e) => setFormData({...formData, outOfServiceDestType: e.target.value, outOfServiceDestId: '', outOfServiceDestData: ''})}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        {Object.entries(destinationTypes).map(([key, label]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                    {formData.outOfServiceDestType !== 'hangup' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Destino</label>
                        {formData.outOfServiceDestType === 'external' ? (
                          <input
                            type="text"
                            value={formData.outOfServiceDestData}
                            onChange={(e) => setFormData({...formData, outOfServiceDestData: e.target.value})}
                            placeholder="Número externo"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                          />
                        ) : (
                          renderDestinationSelect(
                            formData.outOfServiceDestType, 
                            formData.outOfServiceDestId,
                            (e) => setFormData({...formData, outOfServiceDestId: e.target.value})
                          )
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.enabled}
                  onChange={(e) => setFormData({...formData, enabled: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2 text-sm">Rota ativa</span>
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
