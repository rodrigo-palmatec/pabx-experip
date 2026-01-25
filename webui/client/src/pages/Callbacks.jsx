import { useState, useEffect } from 'react'
import { PhoneCallback, Plus, Trash2, Edit2, AlertCircle, CheckCircle, XCircle } from 'lucide-react'
import api from '../services/api'

function CallbackModal({ isOpen, onClose, onSave, callback, queues, ivrs, profiles }) {
  const [form, setForm] = useState({
    name: '',
    extension: '',
    type: 'queue',
    destinationType: 'queue',
    destinationId: '',
    profileId: '',
    phoneFilter: 'all',
    audioFile: '',
    delay: 5,
    enabled: true
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (callback) {
      setForm({
        name: callback.name || '',
        extension: callback.extension || '',
        type: callback.type || 'queue',
        destinationType: callback.destinationType || 'queue',
        destinationId: callback.destinationId || '',
        profileId: callback.profileId || '',
        phoneFilter: callback.phoneFilter || 'all',
        audioFile: callback.audioFile || '',
        delay: callback.delay || 5,
        enabled: callback.enabled !== false
      })
    } else {
      setForm({
        name: '',
        extension: '',
        type: 'queue',
        destinationType: 'queue',
        destinationId: '',
        profileId: '',
        phoneFilter: 'all',
        audioFile: '',
        delay: 5,
        enabled: true
      })
    }
  }, [callback])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave(form)
      onClose()
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">
            {callback ? 'Editar CallBack' : 'Novo CallBack'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
                placeholder="Ex: Callback Comercial"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ramal *
              </label>
              <input
                type="text"
                value={form.extension}
                onChange={(e) => setForm({ ...form, extension: e.target.value })}
                className="input"
                placeholder="Ex: 900"
                required
                pattern="\d{2,6}"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo do CallBack
            </label>
            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="input"
            >
              <option value="queue">Callback de Fila</option>
              <option value="inbound">Callback de Entrada</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">
              {form.type === 'queue' 
                ? 'Retorna ligações perdidas de filas'
                : 'Vinculado a uma rota de entrada específica'}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Perfil de Retorno
            </label>
            <select
              value={form.profileId}
              onChange={(e) => setForm({ ...form, profileId: e.target.value })}
              className="input"
            >
              <option value="">Selecione um perfil</option>
              {profiles?.map(profile => (
                <option key={profile.id} value={profile.id}>{profile.name}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Perfil de rotas de saída para realizar o retorno
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Filtro de Telefone
            </label>
            <select
              value={form.phoneFilter}
              onChange={(e) => setForm({ ...form, phoneFilter: e.target.value })}
              className="input"
            >
              <option value="all">Todos os telefones</option>
              <option value="mobile">Apenas celulares</option>
              <option value="landline">Apenas fixos</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Entrada do Retorno
            </label>
            <select
              value={form.destinationType}
              onChange={(e) => setForm({ ...form, destinationType: e.target.value, destinationId: '' })}
              className="input"
            >
              <option value="queue">Fila</option>
              <option value="ivr">URA</option>
              <option value="peer">Ramal</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destino
            </label>
            <select
              value={form.destinationId}
              onChange={(e) => setForm({ ...form, destinationId: e.target.value })}
              className="input"
            >
              <option value="">Selecione o destino</option>
              {form.destinationType === 'queue' && queues?.map(q => (
                <option key={q.id} value={q.id}>{q.name} ({q.extension})</option>
              ))}
              {form.destinationType === 'ivr' && ivrs?.map(i => (
                <option key={i.id} value={i.id}>{i.name} ({i.extension})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Áudio
            </label>
            <input
              type="text"
              value={form.audioFile}
              onChange={(e) => setForm({ ...form, audioFile: e.target.value })}
              className="input"
              placeholder="Nome do arquivo de áudio"
            />
            <p className="text-xs text-gray-500 mt-1">
              Áudio que tocará quando o cliente atender o retorno
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Atraso (segundos)
            </label>
            <input
              type="number"
              value={form.delay}
              onChange={(e) => setForm({ ...form, delay: parseInt(e.target.value) || 5 })}
              className="input"
              min="1"
              max="300"
            />
            <p className="text-xs text-gray-500 mt-1">
              Tempo de espera antes de realizar o retorno
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="enabled"
              checked={form.enabled}
              onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="enabled" className="text-sm font-medium text-gray-700">
              Habilitado
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function Callbacks() {
  const [callbacks, setCallbacks] = useState([])
  const [queues, setQueues] = useState([])
  const [ivrs, setIvrs] = useState([])
  const [profiles, setProfiles] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')

  const fetchData = async () => {
    try {
      const [cbRes, qRes, iRes, pRes] = await Promise.all([
        api.get('/callbacks'),
        api.get('/queues'),
        api.get('/ivrs'),
        api.get('/profiles')
      ])
      setCallbacks(cbRes.data)
      setQueues(qRes.data)
      setIvrs(iRes.data)
      setProfiles(pRes.data)
    } catch (err) {
      setError('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSave = async (data) => {
    try {
      if (editing) {
        await api.put(`/callbacks/${editing.id}`, data)
      } else {
        await api.post('/callbacks', data)
      }
      fetchData()
      setError('')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao salvar callback')
      throw err
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Excluir callback "${name}"?`)) return
    try {
      await api.delete(`/callbacks/${id}`)
      fetchData()
      setError('')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao excluir callback')
    }
  }

  const getDestinationName = (cb) => {
    if (cb.destinationType === 'queue') {
      const queue = queues.find(q => q.id === cb.destinationId)
      return queue ? `Fila: ${queue.name}` : '-'
    }
    if (cb.destinationType === 'ivr') {
      const ivr = ivrs.find(i => i.id === cb.destinationId)
      return ivr ? `URA: ${ivr.name}` : '-'
    }
    return cb.destinationData || '-'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CallBack</h1>
          <p className="text-gray-500">Configurar retorno automático de ligações perdidas</p>
        </div>
        <button 
          onClick={() => { setEditing(null); setModalOpen(true) }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Novo CallBack
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <div className="card">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : callbacks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <PhoneCallback className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum callback configurado</p>
            <p className="text-sm mt-1">Configure callbacks para retornar ligações perdidas automaticamente</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">Nome</th>
                  <th className="pb-3 font-medium">Ramal</th>
                  <th className="pb-3 font-medium">Tipo</th>
                  <th className="pb-3 font-medium">Destino</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {callbacks.map(cb => (
                  <tr key={cb.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <PhoneCallback className="w-4 h-4 text-primary-500" />
                        <span className="font-medium">{cb.name}</span>
                      </div>
                    </td>
                    <td className="py-3 text-gray-500">{cb.extension}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded ${
                        cb.type === 'queue' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {cb.type === 'queue' ? 'Fila' : 'Entrada'}
                      </span>
                    </td>
                    <td className="py-3 text-gray-500">{getDestinationName(cb)}</td>
                    <td className="py-3">
                      {cb.enabled ? (
                        <span className="inline-flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" /> Ativo
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-400">
                          <XCircle className="w-4 h-4" /> Inativo
                        </span>
                      )}
                    </td>
                    <td className="py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => { setEditing(cb); setModalOpen(true) }}
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(cb.id, cb.name)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
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

      <CallbackModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null) }}
        onSave={handleSave}
        callback={editing}
        queues={queues}
        ivrs={ivrs}
        profiles={profiles}
      />
    </div>
  )
}
