import { useState, useEffect, useRef } from 'react'
import { Music, Plus, Trash2, Edit2, Upload, Play, Pause, AlertCircle, FileAudio, X, FolderOpen } from 'lucide-react'
import api from '../services/api'

function MOHModal({ isOpen, onClose, onSave, moh }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    directory: '/var/lib/asterisk/moh/',
    mode: 'files',
    sort: 'alpha'
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (moh) {
      setForm({
        name: moh.name || '',
        description: moh.description || '',
        directory: moh.directory || '/var/lib/asterisk/moh/',
        mode: moh.mode || 'files',
        sort: moh.sort || 'alpha'
      })
    } else {
      setForm({
        name: '',
        description: '',
        directory: '/var/lib/asterisk/moh/',
        mode: 'files',
        sort: 'alpha'
      })
    }
  }, [moh])

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
            {moh ? 'Editar Música de Espera' : 'Nova Música de Espera'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome *
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input"
              placeholder="Ex: musica-comercial"
              required
              disabled={!!moh}
            />
            <p className="text-xs text-gray-500 mt-1">
              Nome identificador do grupo de músicas
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input"
              placeholder="Ex: Músicas para fila comercial"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diretório *
            </label>
            <input
              type="text"
              value={form.directory}
              onChange={(e) => setForm({ ...form, directory: e.target.value })}
              className="input"
              placeholder="/var/lib/asterisk/moh/comercial"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Caminho onde os arquivos de áudio estão armazenados
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modo
            </label>
            <select
              value={form.mode}
              onChange={(e) => setForm({ ...form, mode: e.target.value })}
              className="input"
            >
              <option value="files">Arquivos</option>
              <option value="quietmp3">Quietmp3</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ordenação
            </label>
            <select
              value={form.sort}
              onChange={(e) => setForm({ ...form, sort: e.target.value })}
              className="input"
            >
              <option value="alpha">Alfabética</option>
              <option value="random">Aleatória</option>
              <option value="randstart">Início Aleatório</option>
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

export default function MusicOnHold() {
  const [mohList, setMohList] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [filesModalOpen, setFilesModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [selectedMoh, setSelectedMoh] = useState(null)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const fetchMOH = async () => {
    try {
      const res = await api.get('/moh')
      setMohList(res.data)
    } catch (err) {
      setError('Erro ao carregar músicas de espera')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMOH()
  }, [])

  const handleSave = async (data) => {
    try {
      if (editing) {
        await api.put(`/moh/${editing.id}`, data)
      } else {
        await api.post('/moh', data)
      }
      fetchMOH()
      setError('')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao salvar música de espera')
      throw err
    }
  }

  const handleDelete = async (id, name) => {
    if (name === 'default') {
      setError('Não é possível excluir a classe padrão')
      return
    }
    if (!confirm(`Excluir grupo de músicas "${name}"?`)) return
    try {
      await api.delete(`/moh/${id}`)
      fetchMOH()
      setError('')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao excluir música de espera')
    }
  }

  const fetchFiles = async (mohId) => {
    try {
      const res = await api.get(`/moh/${mohId}/files`)
      setFiles(res.data)
    } catch (err) {
      setError('Erro ao carregar arquivos')
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file || !selectedMoh) return

    setUploading(true)
    const formData = new FormData()
    formData.append('audio', file)

    try {
      await api.post(`/moh/${selectedMoh.id}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      fetchFiles(selectedMoh.id)
      setError('')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao fazer upload')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDeleteFile = async (filename) => {
    if (!confirm(`Excluir arquivo "${filename}"?`)) return
    try {
      await api.delete(`/moh/${selectedMoh.id}/files/${encodeURIComponent(filename)}`)
      fetchFiles(selectedMoh.id)
      setError('')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao excluir arquivo')
    }
  }

  const openFilesModal = (moh) => {
    setSelectedMoh(moh)
    setFilesModalOpen(true)
    fetchFiles(moh.id)
  }

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Músicas de Espera</h1>
          <p className="text-gray-500">Gerenciar grupos de músicas para filas de atendimento</p>
        </div>
        <button 
          onClick={() => { setEditing(null); setModalOpen(true) }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nova Música de Espera
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
        ) : mohList.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Music className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum grupo de músicas configurado</p>
            <p className="text-sm mt-1">Adicione um grupo para usar nas filas de atendimento</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">Nome</th>
                  <th className="pb-3 font-medium">Descrição</th>
                  <th className="pb-3 font-medium">Diretório</th>
                  <th className="pb-3 font-medium">Modo</th>
                  <th className="pb-3 font-medium text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {mohList.map(moh => (
                  <tr key={moh.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <Music className="w-4 h-4 text-primary-500" />
                        <span className="font-medium">{moh.name}</span>
                        {moh.name === 'default' && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            Padrão
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 text-gray-500">{moh.description || '-'}</td>
                    <td className="py-3 text-gray-500 text-sm font-mono">{moh.directory}</td>
                    <td className="py-3 text-gray-500 capitalize">{moh.mode}</td>
                    <td className="py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openFilesModal(moh)}
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg"
                          title="Gerenciar Arquivos"
                        >
                          <FolderOpen className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setEditing(moh); setModalOpen(true) }}
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {moh.name !== 'default' && (
                          <button
                            onClick={() => handleDelete(moh.id, moh.name)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Excluir"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="card bg-blue-50 border-blue-200">
        <div className="flex gap-3">
          <div className="text-blue-500">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-blue-800">Formatos de áudio suportados</h3>
            <p className="text-sm text-blue-700 mt-1">
              Os arquivos de áudio devem estar nos formatos <strong>.wav</strong> ou <strong>.mp3</strong>.
              Para melhor compatibilidade, utilize WAV com taxa de 8kHz, 16-bit, mono.
            </p>
          </div>
        </div>
      </div>

      <MOHModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null) }}
        onSave={handleSave}
        moh={editing}
      />

      {/* Modal de Gerenciamento de Arquivos */}
      {filesModalOpen && selectedMoh && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Arquivos de Áudio</h2>
                <p className="text-sm text-gray-500">{selectedMoh.name} - {selectedMoh.directory}</p>
              </div>
              <button
                onClick={() => { setFilesModalOpen(false); setSelectedMoh(null); setFiles([]) }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              {/* Upload Area */}
              <div className="mb-6">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".wav,.mp3,.gsm"
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 hover:bg-primary-50 transition-colors"
                >
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600">
                    {uploading ? 'Enviando...' : 'Clique para fazer upload de áudio'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">WAV, MP3 ou GSM (máx. 50MB)</p>
                </button>
              </div>

              {/* File List */}
              {files.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileAudio className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>Nenhum arquivo de áudio encontrado</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {files.map(file => (
                    <div
                      key={file.name}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileAudio className="w-5 h-5 text-primary-500" />
                        <div>
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteFile(file.name)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t bg-gray-50">
              <p className="text-xs text-gray-500 text-center">
                Total: {files.length} arquivo(s)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
