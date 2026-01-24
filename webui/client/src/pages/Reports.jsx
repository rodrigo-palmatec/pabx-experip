import { useState, useEffect } from 'react'
import api from '../services/api'

export default function Reports() {
  const [loading, setLoading] = useState(true)
  const [calls, setCalls] = useState([])
  const [summary, setSummary] = useState(null)
  const [filters, setFilters] = useState({
    startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    src: '',
    dst: '',
    disposition: ''
  })
  const [pagination, setPagination] = useState({ total: 0, limit: 50, offset: 0 })

  useEffect(() => {
    fetchData()
  }, [filters, pagination.offset])

  const fetchData = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        ...filters,
        limit: pagination.limit,
        offset: pagination.offset
      })
      
      const [callsRes, summaryRes] = await Promise.all([
        api.get(`/reports/calls?${params}`),
        api.get(`/reports/summary?startDate=${filters.startDate}&endDate=${filters.endDate}`)
      ])
      
      setCalls(callsRes.data.data || [])
      setPagination(prev => ({ ...prev, total: callsRes.data.total }))
      setSummary(summaryRes.data)
    } catch (error) {
      console.error('Erro ao carregar relatórios:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (seconds) => {
    if (!seconds) return '0:00'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${String(secs).padStart(2, '0')}`
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleString('pt-BR')
  }

  const dispositionColors = {
    'ANSWERED': 'bg-green-100 text-green-800',
    'NO ANSWER': 'bg-yellow-100 text-yellow-800',
    'BUSY': 'bg-orange-100 text-orange-800',
    'FAILED': 'bg-red-100 text-red-800',
    'CONGESTION': 'bg-red-100 text-red-800'
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Relatórios de Chamadas</h1>

      {/* Filtros */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Início</label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({...filters, startDate: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Data Fim</label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({...filters, endDate: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Origem</label>
            <input
              type="text"
              value={filters.src}
              onChange={(e) => setFilters({...filters, src: e.target.value})}
              placeholder="Número origem"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Destino</label>
            <input
              type="text"
              value={filters.dst}
              onChange={(e) => setFilters({...filters, dst: e.target.value})}
              placeholder="Número destino"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              value={filters.disposition}
              onChange={(e) => setFilters({...filters, disposition: e.target.value})}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Todos</option>
              <option value="ANSWERED">Atendida</option>
              <option value="NO ANSWER">Não Atendida</option>
              <option value="BUSY">Ocupado</option>
              <option value="FAILED">Falha</option>
            </select>
          </div>
        </div>
      </div>

      {/* Resumo */}
      {summary && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-blue-600">{summary.totalCalls}</div>
            <div className="text-sm text-gray-500">Total de Chamadas</div>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-green-600">{summary.answeredCalls}</div>
            <div className="text-sm text-gray-500">Atendidas</div>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-yellow-600">{summary.missedCalls}</div>
            <div className="text-sm text-gray-500">Não Atendidas</div>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-purple-600">{summary.answerRate}%</div>
            <div className="text-sm text-gray-500">Taxa de Atendimento</div>
          </div>
          <div className="bg-white shadow rounded-lg p-4 text-center">
            <div className="text-3xl font-bold text-indigo-600">
              {formatDuration(Math.round(summary.avgDuration || 0))}
            </div>
            <div className="text-sm text-gray-500">Duração Média</div>
          </div>
        </div>
      )}

      {/* Tabela de Chamadas */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">Carregando...</div>
        ) : (
          <>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Origem</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Destino</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duração</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {calls.map((call, idx) => (
                  <tr key={call.id || idx} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{formatDate(call.calldate)}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{call.src || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{call.dst || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{formatDuration(call.billsec)}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${dispositionColors[call.disposition] || 'bg-gray-100'}`}>
                        {call.disposition || '-'}
                      </span>
                    </td>
                  </tr>
                ))}
                {calls.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                      Nenhuma chamada encontrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            
            {/* Paginação */}
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
    </div>
  )
}
