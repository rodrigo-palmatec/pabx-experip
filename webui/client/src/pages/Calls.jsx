import { useState, useEffect } from 'react'
import { PhoneCall, PhoneOff, PhoneOutgoing, RefreshCw } from 'lucide-react'
import api from '../services/api'
import socket, { connectSocket } from '../services/socket'

function OriginateModal({ isOpen, onClose, onOriginate }) {
  const [form, setForm] = useState({ from: '', to: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onOriginate(form.from, form.to)
      onClose()
      setForm({ from: '', to: '' })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Originar Chamada</h2>
          <p className="text-sm text-gray-500 mt-1">
            O ramal de origem receberá a chamada primeiro, depois será conectado ao destino.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ramal de Origem
            </label>
            <input
              type="text"
              value={form.from}
              onChange={(e) => setForm({ ...form, from: e.target.value })}
              className="input"
              placeholder="Ex: 1001"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de Destino
            </label>
            <input
              type="text"
              value={form.to}
              onChange={(e) => setForm({ ...form, to: e.target.value })}
              className="input"
              placeholder="Ex: 1002 ou número externo"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Chamando...' : 'Chamar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Calls() {
  const [calls, setCalls] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const fetchCalls = async () => {
    try {
      const res = await api.get('/calls/active')
      setCalls(res.data)
    } catch (err) {
      console.error('Erro ao carregar chamadas:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCalls()
    const interval = setInterval(fetchCalls, 5000)
    
    connectSocket()
    socket.on('call-event', fetchCalls)
    
    return () => {
      clearInterval(interval)
      socket.off('call-event')
    }
  }, [])

  const handleOriginate = async (from, to) => {
    try {
      await api.post('/calls/originate', { from, to })
      setSuccess('Chamada iniciada com sucesso')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao originar chamada')
      throw err
    }
  }

  const handleHangup = async (channel) => {
    if (!confirm('Desligar esta chamada?')) return
    try {
      await api.post('/calls/hangup', { channel })
      fetchCalls()
    } catch (err) {
      setError('Erro ao desligar chamada')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chamadas</h1>
          <p className="text-gray-500">Monitorar e gerenciar chamadas ativas</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={fetchCalls}
            className="btn-secondary flex items-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Atualizar
          </button>
          <button 
            onClick={() => setModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <PhoneOutgoing className="w-5 h-5" />
            Nova Chamada
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <PhoneCall className="w-5 h-5 text-primary-600" />
            Chamadas Ativas
            <span className="ml-2 px-2 py-0.5 bg-primary-100 text-primary-700 rounded-full text-sm">
              {calls.length}
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : calls.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <PhoneCall className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma chamada ativa no momento</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">Canal</th>
                  <th className="pb-3 font-medium">Caller ID</th>
                  <th className="pb-3 font-medium">Destino</th>
                  <th className="pb-3 font-medium">Estado</th>
                  <th className="pb-3 font-medium">Aplicação</th>
                  <th className="pb-3 font-medium">Duração</th>
                  <th className="pb-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {calls.map((call, i) => (
                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {call.channel?.split('-')[0] || call.channel}
                      </span>
                    </td>
                    <td className="py-3">
                      <div>
                        <p className="font-medium">{call.calleridName || '-'}</p>
                        <p className="text-sm text-gray-500">{call.callerid || '-'}</p>
                      </div>
                    </td>
                    <td className="py-3">{call.extension || '-'}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        call.state === 'Up' 
                          ? 'bg-green-100 text-green-700'
                          : call.state === 'Ringing'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {call.state}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500">{call.application || '-'}</td>
                    <td className="py-3 font-mono text-sm">{call.duration || '0:00'}</td>
                    <td className="py-3">
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleHangup(call.channel)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          title="Desligar"
                        >
                          <PhoneOff className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <OriginateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onOriginate={handleOriginate}
      />
    </div>
  )
}
