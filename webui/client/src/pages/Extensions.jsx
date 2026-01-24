import { useState, useEffect } from 'react'
import { Phone, Plus, Trash2, Edit2, CheckCircle, XCircle, Search } from 'lucide-react'
import api from '../services/api'

function ExtensionModal({ isOpen, onClose, onSave, extension }) {
  const [form, setForm] = useState({
    extension: '',
    name: '',
    password: '',
    context: 'internal'
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (extension) {
      setForm({
        extension: extension.extension,
        name: extension.callerid?.replace(/[<>"\d]/g, '').trim() || '',
        password: '',
        context: extension.context || 'internal'
      })
    } else {
      setForm({ extension: '', name: '', password: '', context: 'internal' })
    }
  }, [extension])

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
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">
            {extension ? 'Editar Ramal' : 'Novo Ramal'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número do Ramal
            </label>
            <input
              type="text"
              value={form.extension}
              onChange={(e) => setForm({ ...form, extension: e.target.value })}
              className="input"
              placeholder="Ex: 1001"
              required
              disabled={!!extension}
              pattern="\d{3,6}"
              title="3 a 6 dígitos"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
              placeholder="Ex: João Silva"
              required
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
              placeholder={extension ? 'Deixe vazio para manter' : 'Senha do ramal'}
              required={!extension}
              minLength={6}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contexto
            </label>
            <select
              value={form.context}
              onChange={(e) => setForm({ ...form, context: e.target.value })}
              className="input"
            >
              <option value="internal">Interno</option>
              <option value="outbound">Saída Externa</option>
            </select>
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

export default function Extensions() {
  const [extensions, setExtensions] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [error, setError] = useState('')

  const fetchExtensions = async () => {
    try {
      const res = await api.get('/extensions')
      setExtensions(res.data)
    } catch (err) {
      setError('Erro ao carregar ramais')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExtensions()
  }, [])

  const handleSave = async (data) => {
    try {
      if (editing) {
        await api.put(`/extensions/${data.extension}`, data)
      } else {
        await api.post('/extensions', data)
      }
      fetchExtensions()
      setError('')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao salvar ramal')
      throw err
    }
  }

  const handleDelete = async (extension) => {
    if (!confirm(`Excluir ramal ${extension}?`)) return
    try {
      await api.delete(`/extensions/${extension}`)
      fetchExtensions()
    } catch (err) {
      setError('Erro ao excluir ramal')
    }
  }

  const filtered = extensions.filter(e => 
    e.extension.includes(search) || 
    (e.callerid && e.callerid.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ramais</h1>
          <p className="text-gray-500">Gerenciar ramais SIP/PJSIP</p>
        </div>
        <button 
          onClick={() => { setEditing(null); setModalOpen(true) }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Novo Ramal
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="card">
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por número ou nome..."
              className="input pl-10"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Phone className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum ramal encontrado</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">Ramal</th>
                  <th className="pb-3 font-medium">Nome</th>
                  <th className="pb-3 font-medium">Contexto</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(ext => (
                  <tr key={ext.extension} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 font-medium">{ext.extension}</td>
                    <td className="py-3">{ext.callerid?.replace(/[<>"\d]/g, '').trim() || '-'}</td>
                    <td className="py-3 text-gray-500">{ext.context}</td>
                    <td className="py-3">
                      {ext.online ? (
                        <span className="inline-flex items-center gap-1 text-green-600">
                          <CheckCircle className="w-4 h-4" /> Online
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-gray-400">
                          <XCircle className="w-4 h-4" /> Offline
                        </span>
                      )}
                    </td>
                    <td className="py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => { setEditing(ext); setModalOpen(true) }}
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(ext.extension)}
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

      <ExtensionModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null) }}
        onSave={handleSave}
        extension={editing}
      />
    </div>
  )
}
