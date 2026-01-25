import { useState, useEffect } from 'react'
import { 
  Phone, 
  PhoneCall, 
  Network, 
  Server,
  Activity,
  TrendingUp,
  PhoneIncoming,
  PhoneOutgoing,
  PhoneMissed,
  Clock,
  BarChart3
} from 'lucide-react'
import api from '../services/api'
import socket, { connectSocket } from '../services/socket'

function StatCard({ icon: Icon, label, value, color, subtext }) {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  )
}

function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400)
  const hours = Math.floor((seconds % 86400) / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  
  if (days > 0) return `${days}d ${hours}h ${mins}m`
  if (hours > 0) return `${hours}h ${mins}m`
  return `${mins}m`
}

function formatBytes(bytes) {
  const gb = bytes / (1024 * 1024 * 1024)
  return `${gb.toFixed(1)} GB`
}

export default function Dashboard() {
  const [status, setStatus] = useState(null)
  const [extensions, setExtensions] = useState([])
  const [activeCalls, setActiveCalls] = useState([])
  const [todayStats, setTodayStats] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchData = async () => {
    try {
      const today = new Date().toISOString().split('T')[0]
      const [statusRes, extRes, callsRes, reportsRes] = await Promise.all([
        api.get('/system/status'),
        api.get('/extensions'),
        api.get('/calls/active'),
        api.get(`/reports?startDate=${today}&endDate=${today}`)
      ])
      setStatus(statusRes.data)
      setExtensions(extRes.data)
      setActiveCalls(callsRes.data)
      setTodayStats(reportsRes.data.summary)
    } catch (err) {
      console.error('Erro ao carregar dados:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 10000)
    
    connectSocket()
    socket.on('call-event', () => {
      api.get('/calls/active').then(res => setActiveCalls(res.data))
    })

    return () => {
      clearInterval(interval)
      socket.off('call-event')
    }
  }, [])

  const onlineExtensions = extensions.filter(e => e.online).length
  const memoryUsage = status?.system ? 
    ((status.system.totalMemory - status.system.freeMemory) / status.system.totalMemory * 100).toFixed(0) : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Visão geral do sistema PABX</p>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Phone}
          label="Ramais Online"
          value={`${onlineExtensions}/${extensions.length}`}
          color="bg-green-500"
        />
        <StatCard
          icon={PhoneCall}
          label="Chamadas Ativas"
          value={status?.asterisk?.calls || activeCalls.length}
          color="bg-blue-500"
        />
        <StatCard
          icon={Network}
          label="Canais Ativos"
          value={status?.asterisk?.channels || 0}
          color="bg-purple-500"
        />
        <StatCard
          icon={Server}
          label="Status Asterisk"
          value={status?.asterisk?.connected ? 'Online' : 'Offline'}
          color={status?.asterisk?.connected ? 'bg-emerald-500' : 'bg-red-500'}
          subtext={status?.asterisk?.version}
        />
      </div>

      {/* Today's Stats */}
      {todayStats && (
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary-600" />
            Estatísticas de Hoje
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <PhoneIncoming className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-700">{todayStats.totalCalls || 0}</div>
              <div className="text-sm text-blue-600">Total de Chamadas</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <PhoneCall className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-700">{todayStats.answered || 0}</div>
              <div className="text-sm text-green-600">Atendidas</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <PhoneMissed className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-700">{todayStats.noAnswer || 0}</div>
              <div className="text-sm text-red-600">Não Atendidas</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Clock className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-700">
                {todayStats.avgDuration ? `${Math.round(todayStats.avgDuration)}s` : '0s'}
              </div>
              <div className="text-sm text-purple-600">Duração Média</div>
            </div>
          </div>
        </div>
      )}

      {/* System Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Asterisk Info */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary-600" />
            Asterisk
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Versão</span>
              <span className="font-medium">{status?.asterisk?.version || '-'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Uptime</span>
              <span className="font-medium">
                {status?.asterisk?.uptime ? formatUptime(status.asterisk.uptime) : '-'}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Canais</span>
              <span className="font-medium">{status?.asterisk?.channels || 0}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Chamadas</span>
              <span className="font-medium">{status?.asterisk?.calls || 0}</span>
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-primary-600" />
            Sistema
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Hostname</span>
              <span className="font-medium">{status?.system?.hostname || '-'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Uptime</span>
              <span className="font-medium">
                {status?.system?.uptime ? formatUptime(status.system.uptime) : '-'}
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">CPUs</span>
              <span className="font-medium">{status?.system?.cpus || '-'}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Memória</span>
              <span className="font-medium">
                {status?.system ? `${memoryUsage}% de ${formatBytes(status.system.totalMemory)}` : '-'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Active Calls */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <PhoneCall className="w-5 h-5 text-primary-600" />
          Chamadas Ativas
        </h2>
        {activeCalls.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Nenhuma chamada ativa no momento</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">Canal</th>
                  <th className="pb-3 font-medium">Caller ID</th>
                  <th className="pb-3 font-medium">Destino</th>
                  <th className="pb-3 font-medium">Estado</th>
                  <th className="pb-3 font-medium">Duração</th>
                </tr>
              </thead>
              <tbody>
                {activeCalls.map((call, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-3 font-mono text-sm">{call.channel}</td>
                    <td className="py-3">{call.callerid || '-'}</td>
                    <td className="py-3">{call.extension || '-'}</td>
                    <td className="py-3">
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        {call.state}
                      </span>
                    </td>
                    <td className="py-3">{call.duration || '0s'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
