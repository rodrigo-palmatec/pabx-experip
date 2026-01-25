import { useState, useEffect, useRef } from 'react'
import { 
  FileAudio, Play, Pause, Download, Trash2, Search, 
  Calendar, HardDrive, Clock, RefreshCw, AlertCircle, X
} from 'lucide-react'
import api from '../services/api'

function AudioPlayer({ src, onClose }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const togglePlay = () => {
    if (audioRef.current) {
      if (playing) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setPlaying(!playing)
    }
  }

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${mins}:${String(s).padStart(2, '0')}`
  }

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    if (audioRef.current) {
      audioRef.current.currentTime = percent * duration
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
      <div className="max-w-4xl mx-auto flex items-center gap-4">
        <audio
          ref={audioRef}
          src={src}
          onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
          onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
          onEnded={() => setPlaying(false)}
        />
        
        <button
          onClick={togglePlay}
          className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700"
        >
          {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

        <div className="flex-1">
          <div
            className="h-2 bg-gray-200 rounded-full cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-primary-600 rounded-full transition-all"
              style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <a
          href={src}
          download
          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
          title="Download"
        >
          <Download className="w-5 h-5" />
        </a>

        <button
          onClick={onClose}
          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

function StatsCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <div className="text-xl font-bold text-gray-800">{value}</div>
          <div className="text-sm text-gray-500">{label}</div>
        </div>
      </div>
    </div>
  )
}

export default function Recordings() {
  const [recordings, setRecordings] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [currentAudio, setCurrentAudio] = useState(null)
  const [filters, setFilters] = useState({
    date: '',
    src: '',
    dst: ''
  })
  const [pagination, setPagination] = useState({ total: 0, limit: 50, offset: 0 })

  const fetchRecordings = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        ...filters,
        limit: pagination.limit,
        offset: pagination.offset
      })
      
      const [recRes, statsRes] = await Promise.all([
        api.get(`/recordings?${params}`),
        api.get('/recordings/stats/summary')
      ])
      
      setRecordings(recRes.data.data || [])
      setPagination(prev => ({ ...prev, total: recRes.data.total }))
      setStats(statsRes.data)
      setError('')
    } catch (err) {
      setError('Erro ao carregar gravações')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRecordings()
  }, [filters, pagination.offset])

  const handleDelete = async (recording) => {
    if (!confirm(`Excluir gravação "${recording.name}"?`)) return
    try {
      await api.delete(`/recordings/${encodeURIComponent(recording.path)}`)
      fetchRecordings()
    } catch (err) {
      setError('Erro ao excluir gravação')
    }
  }

  const formatFileSize = (bytes) => {
    if (!bytes) return '-'
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleString('pt-BR')
  }

  const playRecording = (recording) => {
    setCurrentAudio(`/api/recordings/${encodeURIComponent(recording.path)}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gravações de Chamadas</h1>
          <p className="text-gray-500">Gerenciar e ouvir gravações de chamadas</p>
        </div>
        <button
          onClick={fetchRecordings}
          className="btn-secondary flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Atualizar
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            icon={FileAudio}
            label="Total de Gravações"
            value={stats.totalFiles}
            color="bg-blue-500"
          />
          <StatsCard
            icon={HardDrive}
            label="Espaço Utilizado"
            value={stats.totalSizeFormatted}
            color="bg-purple-500"
          />
          <StatsCard
            icon={Calendar}
            label="Mais Antiga"
            value={stats.oldestDate ? new Date(stats.oldestDate).toLocaleDateString('pt-BR') : '-'}
            color="bg-gray-500"
          />
          <StatsCard
            icon={Clock}
            label="Mais Recente"
            value={stats.newestDate ? new Date(stats.newestDate).toLocaleDateString('pt-BR') : '-'}
            color="bg-green-500"
          />
        </div>
      )}

      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
            <input
              type="date"
              value={filters.date}
              onChange={(e) => setFilters({ ...filters, date: e.target.value })}
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Origem</label>
            <input
              type="text"
              value={filters.src}
              onChange={(e) => setFilters({ ...filters, src: e.target.value })}
              placeholder="Buscar por origem"
              className="input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
            <input
              type="text"
              value={filters.dst}
              onChange={(e) => setFilters({ ...filters, dst: e.target.value })}
              placeholder="Buscar por destino"
              className="input"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={() => setFilters({ date: '', src: '', dst: '' })}
              className="btn-secondary w-full"
            >
              Limpar Filtros
            </button>
          </div>
        </div>
      </div>

      {/* Recordings List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>
        ) : recordings.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FileAudio className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma gravação encontrada</p>
            <p className="text-sm mt-1">As gravações aparecerão aqui quando disponíveis</p>
          </div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Arquivo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tamanho</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recordings.map((rec, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileAudio className="w-4 h-4 text-primary-500" />
                        <span className="text-sm font-medium">{rec.name}</span>
                      </div>
                      {rec.path !== rec.name && (
                        <span className="text-xs text-gray-400">{rec.path}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(rec.date)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {formatFileSize(rec.size)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => playRecording(rec)}
                          className="p-2 text-primary-600 hover:bg-primary-50 rounded-lg"
                          title="Reproduzir"
                        >
                          <Play className="w-4 h-4" />
                        </button>
                        <a
                          href={`/api/recordings/${encodeURIComponent(rec.path)}`}
                          download
                          className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg"
                          title="Download"
                        >
                          <Download className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => handleDelete(rec)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
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

            {/* Pagination */}
            {pagination.total > pagination.limit && (
              <div className="px-4 py-3 bg-gray-50 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  Mostrando {pagination.offset + 1} - {Math.min(pagination.offset + pagination.limit, pagination.total)} de {pagination.total}
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => setPagination(p => ({ ...p, offset: Math.max(0, p.offset - p.limit) }))}
                    disabled={pagination.offset === 0}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Anterior
                  </button>
                  <button
                    onClick={() => setPagination(p => ({ ...p, offset: p.offset + p.limit }))}
                    disabled={pagination.offset + pagination.limit >= pagination.total}
                    className="px-3 py-1 border rounded disabled:opacity-50"
                  >
                    Próximo
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Audio Player */}
      {currentAudio && (
        <AudioPlayer
          src={currentAudio}
          onClose={() => setCurrentAudio(null)}
        />
      )}
    </div>
  )
}
