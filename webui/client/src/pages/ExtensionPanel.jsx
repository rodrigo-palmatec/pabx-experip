import { useState, useEffect, useCallback } from 'react'
import { 
  Phone, PhoneCall, PhoneOff, PhoneIncoming, PhoneOutgoing, 
  User, Users, Clock, RefreshCw, Search, Filter, 
  Circle, Pause, Coffee, AlertCircle
} from 'lucide-react'
import api from '../services/api'
import socket, { connectSocket } from '../services/socket'

const STATUS_CONFIG = {
  AVAILABLE: { label: 'Disponível', color: 'bg-green-500', icon: Circle },
  BUSY: { label: 'Em ligação', color: 'bg-red-500', icon: PhoneCall },
  RINGING: { label: 'Tocando', color: 'bg-yellow-500', icon: PhoneIncoming },
  UNAVAILABLE: { label: 'Indisponível', color: 'bg-gray-400', icon: PhoneOff },
  PAUSED: { label: 'Pausado', color: 'bg-orange-500', icon: Pause },
  AWAY: { label: 'Ausente', color: 'bg-blue-500', icon: Coffee },
}

function ExtensionCard({ extension, onClick }) {
  const status = STATUS_CONFIG[extension.status] || STATUS_CONFIG.UNAVAILABLE
  const StatusIcon = status.icon

  return (
    <div 
      onClick={() => onClick?.(extension)}
      className={`
        relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
        ${extension.status === 'BUSY' ? 'border-red-300 bg-red-50' : 
          extension.status === 'AVAILABLE' ? 'border-green-300 bg-green-50' :
          extension.status === 'RINGING' ? 'border-yellow-300 bg-yellow-50 animate-pulse' :
          'border-gray-200 bg-white'}
        hover:shadow-lg hover:scale-[1.02]
      `}
    >
      {/* Status indicator */}
      <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${status.color}`} />
      
      {/* Extension number */}
      <div className="text-2xl font-bold text-gray-800 mb-1">
        {extension.username}
      </div>
      
      {/* Name */}
      <div className="text-sm text-gray-600 truncate mb-2">
        {extension.name}
      </div>
      
      {/* Status */}
      <div className="flex items-center gap-1 text-xs">
        <StatusIcon className="w-3 h-3" />
        <span>{status.label}</span>
      </div>
      
      {/* Call info if busy */}
      {extension.status === 'BUSY' && extension.callInfo && (
        <div className="mt-2 pt-2 border-t border-red-200">
          <div className="text-xs text-red-700">
            <div className="flex items-center gap-1">
              {extension.callInfo.direction === 'inbound' ? (
                <PhoneIncoming className="w-3 h-3" />
              ) : (
                <PhoneOutgoing className="w-3 h-3" />
              )}
              <span>{extension.callInfo.number || 'Chamada ativa'}</span>
            </div>
            {extension.callInfo.duration && (
              <div className="flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                <span>{extension.callInfo.duration}</span>
              </div>
            )}
          </div>
        </div>
      )}
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
          <div className="text-2xl font-bold text-gray-800">{value}</div>
          <div className="text-sm text-gray-500">{label}</div>
        </div>
      </div>
    </div>
  )
}

export default function ExtensionPanel() {
  const [extensions, setExtensions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(null)
  const [socket, setSocket] = useState(null)

  const fetchExtensions = useCallback(async () => {
    try {
      // Usar mesma rota do Dashboard - /extensions
      const res = await api.get('/extensions')
      
      // Mapear campo 'online' para status do painel
      const mapped = res.data.map(extension => ({
        ...extension,
        status: extension.online ? 'AVAILABLE' : 'UNAVAILABLE',
        callInfo: null // Será preenchido com dados de chamadas ativas
      }))
      
      setExtensions(mapped)
      setLastUpdate(new Date())
      setError('')
    } catch (err) {
      setError('Erro ao carregar ramais')
    } finally {
      setLoading(false)
    }
  }, [])

  const mapSipStatus = (sipStatus) => {
    if (!sipStatus) return 'UNAVAILABLE'
    const s = sipStatus.toUpperCase()
    if (s.includes('OK') || s.includes('REACHABLE') || s === 'AVAILABLE') return 'AVAILABLE'
    if (s.includes('BUSY') || s.includes('INUSE')) return 'BUSY'
    if (s.includes('RINGING')) return 'RINGING'
    if (s.includes('PAUSED')) return 'PAUSED'
    return 'UNAVAILABLE'
  }

  useEffect(() => {
    fetchExtensions()
    const interval = setInterval(fetchExtensions, 10000)
    
    // Usar mesmo socket do Dashboard
    connectSocket()
    socket.on('call-event', () => {
      fetchExtensions() // Recarregar quando houver eventos de chamada
    })

    return () => {
      clearInterval(interval)
      socket.off('call-event')
    }
  }, [fetchExtensions])

  // Filtrar extensões
  const filteredExtensions = extensions.filter(ext => {
    const matchesSearch = 
      ext.username?.toLowerCase().includes(search.toLowerCase()) ||
      ext.name?.toLowerCase().includes(search.toLowerCase())
    
    if (filter === 'all') return matchesSearch
    if (filter === 'available') return matchesSearch && ext.status === 'AVAILABLE'
    if (filter === 'busy') return matchesSearch && ext.status === 'BUSY'
    if (filter === 'unavailable') return matchesSearch && ext.status === 'UNAVAILABLE'
    return matchesSearch
  })

  // Estatísticas
  const stats = {
    total: extensions.length,
    available: extensions.filter(e => e.status === 'AVAILABLE').length,
    busy: extensions.filter(e => e.status === 'BUSY').length,
    unavailable: extensions.filter(e => e.status === 'UNAVAILABLE').length
  }

  const handleExtensionClick = (extension) => {
    // Pode abrir modal com detalhes ou ações
    console.log('Extension clicked:', extension)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Painel de Ramais</h1>
          <p className="text-gray-500">Monitoramento em tempo real</p>
        </div>
        <div className="flex items-center gap-3">
          {lastUpdate && (
            <span className="text-xs text-gray-400">
              Atualizado: {lastUpdate.toLocaleTimeString()}
            </span>
          )}
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-gray-300 text-primary-600"
            />
            Auto-atualizar
          </label>
          <button
            onClick={fetchExtensions}
            className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
            title="Atualizar agora"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          icon={Users} 
          label="Total de Ramais" 
          value={stats.total} 
          color="bg-gray-500"
        />
        <StatsCard 
          icon={Phone} 
          label="Disponíveis" 
          value={stats.available} 
          color="bg-green-500"
        />
        <StatsCard 
          icon={PhoneCall} 
          label="Em Ligação" 
          value={stats.busy} 
          color="bg-red-500"
        />
        <StatsCard 
          icon={PhoneOff} 
          label="Indisponíveis" 
          value={stats.unavailable} 
          color="bg-gray-400"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por ramal ou nome..."
            className="input pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input w-auto"
          >
            <option value="all">Todos</option>
            <option value="available">Disponíveis</option>
            <option value="busy">Em ligação</option>
            <option value="unavailable">Indisponíveis</option>
          </select>
        </div>
      </div>

      {/* Extensions Grid */}
      {loading && extensions.length === 0 ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
        </div>
      ) : filteredExtensions.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>Nenhum ramal encontrado</p>
          {search && <p className="text-sm mt-1">Tente ajustar os filtros de busca</p>}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredExtensions.map(ext => (
            <ExtensionCard 
              key={ext.id} 
              extension={ext} 
              onClick={handleExtensionClick}
            />
          ))}
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 justify-center text-sm text-gray-500 pt-4 border-t">
        {Object.entries(STATUS_CONFIG).map(([key, config]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${config.color}`} />
            <span>{config.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
