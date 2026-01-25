import { useState, useEffect } from 'react'
import { Network, Plus, Trash2, Edit2, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import api from '../services/api'

function TrunkModal({ isOpen, onClose, onSave, trunk }) {
  const [form, setForm] = useState({
    name: '',
    host: '',
    username: '',
    password: '',
    context: 'from-trunk',
    codecs: 'ulaw,alaw,g722',
    authType: 'send_register',
    callerid: '',
    callLimit: 0,
    qualify: true,
    enabled: true
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (trunk) {
      setForm({
        name: trunk.name || '',
        host: trunk.host || '',
        username: trunk.username || '',
        password: '',
        context: trunk.context || 'from-trunk',
        codecs: trunk.codecs || 'ulaw,alaw,g722',
        authType: trunk.authType || 'send_register',
        callerid: trunk.callerid || '',
        callLimit: trunk.callLimit || 0,
        qualify: trunk.qualify !== false,
        enabled: trunk.enabled !== false
      })
    } else {
      setForm({
        name: '',
        host: '',
        username: '',
        password: '',
        context: 'from-trunk',
        codecs: 'ulaw,alaw,g722',
        authType: 'send_register',
        callerid: '',
        callLimit: 0,
        qualify: true,
        enabled: true
      })
    }
  }, [trunk])

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
            {trunk ? 'Editar Tronco SIP' : 'Novo Tronco SIP'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome do Tronco *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
                placeholder="Ex: operadora-voip"
                required
                disabled={!!trunk}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Host/IP *
              </label>
              <input
                type="text"
                value={form.host}
                onChange={(e) => setForm({ ...form, host: e.target.value })}
                className="input"
                placeholder="sip.provedor.com.br"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Autenticação
            </label>
            <select
              value={form.authType}
              onChange={(e) => setForm({ ...form, authType: e.target.value })}
              className="input"
            >
              <option value="send_register">Envia Registro</option>
              <option value="receive_register">Recebe Registro</option>
              <option value="by_ip">Por IP</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuário SIP
              </label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="input"
                placeholder="Usuário"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha SIP
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input"
                placeholder={trunk ? 'Manter atual' : 'Senha'}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                BINA (Caller ID)
              </label>
              <input
                type="text"
                value={form.callerid}
                onChange={(e) => setForm({ ...form, callerid: e.target.value })}
                className="input"
                placeholder="Número de identificação"
              />
              <p className="text-xs text-gray-500 mt-1">
                Número exibido nas ligações saintes
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Limite de Chamadas
              </label>
              <input
                type="number"
                value={form.callLimit}
                onChange={(e) => setForm({ ...form, callLimit: parseInt(e.target.value) || 0 })}
                className="input"
                min="0"
              />
              <p className="text-xs text-gray-500 mt-1">
                0 = ilimitado
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Codecs
            </label>
            <input
              type="text"
              value={form.codecs}
              onChange={(e) => setForm({ ...form, codecs: e.target.value })}
              className="input"
              placeholder="ulaw,alaw,g722"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.qualify}
                onChange={(e) => setForm({ ...form, qualify: e.target.checked })}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">Monitorar Status</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.enabled}
                onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">Habilitado</span>
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

export default function Trunks() {
  const [trunks, setTrunks] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')

  const fetchTrunks = async () => {
    try {
      const res = await api.get('/trunks')
      setTrunks(res.data)
    } catch (err) {
      setError('Erro ao carregar troncos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrunks()
  }, [])

  const handleSave = async (data) => {
    try {
      if (editing) {
        await api.put(`/trunks/${editing.name}`, data)
      } else {
        await api.post('/trunks', data)
      }
      fetchTrunks()
      setError('')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao salvar tronco')
      throw err
    }
  }

  const handleDelete = async (name) => {
    if (!confirm(`Excluir tronco ${name}?`)) return
    try {
      await api.delete(`/trunks/${name}`)
      fetchTrunks()
    } catch (err) {
      setError('Erro ao excluir tronco')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Troncos</h1>
          <p className="text-gray-500">Gerenciar conexões com provedores VoIP</p>
        </div>
        <button 
          onClick={() => { setEditing(null); setModalOpen(true) }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Novo Tronco
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
        ) : trunks.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Network className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum tronco configurado</p>
            <p className="text-sm mt-1">Adicione um tronco para conectar ao provedor VoIP</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">Nome</th>
                  <th className="pb-3 font-medium">Host</th>
                  <th className="pb-3 font-medium">Contexto</th>
                  <th className="pb-3 font-medium">Registro</th>
                  <th className="pb-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {trunks.map(trunk => (
                  <tr key={trunk.name} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 font-medium">{trunk.name}</td>
                    <td className="py-3 text-gray-500">{trunk.host || '-'}</td>
                    <td className="py-3 text-gray-500">{trunk.context}</td>
                    <td className="py-3">
                      {trunk.registered ? (
                        <span className="inline-flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" /> Registrado
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-yellow-600">
                          <XCircle className="w-4 h-4" /> {trunk.status || 'Não registrado'}
                        </span>
                      )}
                    </td>
                    <td className="py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => { setEditing(trunk); setModalOpen(true) }}
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(trunk.name)}
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

      <TrunkModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null) }}
        onSave={handleSave}
        trunk={editing}
      />
    </div>
  )
}
