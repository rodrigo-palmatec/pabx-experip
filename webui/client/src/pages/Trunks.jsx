import { useState, useEffect } from 'react'
import { Network, Plus, Trash2, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import api from '../services/api'

function TrunkModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    name: '',
    host: '',
    username: '',
    password: '',
    context: 'from-trunk',
    codecs: 'ulaw,alaw,g722'
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave(form)
      onClose()
      setForm({ name: '', host: '', username: '', password: '', context: 'from-trunk', codecs: 'ulaw,alaw,g722' })
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Novo Tronco SIP</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Tronco
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
              placeholder="Ex: operadora-voip"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Host/IP do Provedor
            </label>
            <input
              type="text"
              value={form.host}
              onChange={(e) => setForm({ ...form, host: e.target.value })}
              className="input"
              placeholder="Ex: sip.provedor.com.br"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuário SIP
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="input"
              placeholder="Usuário de autenticação"
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
              placeholder="Senha de autenticação"
            />
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
          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancelar
            </button>
            <button type="submit" disabled={loading} className="btn-primary flex-1">
              {loading ? 'Salvando...' : 'Criar Tronco'}
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
      await api.post('/trunks', data)
      fetchTrunks()
      setError('')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao criar tronco')
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
          onClick={() => setModalOpen(true)}
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
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  )
}
