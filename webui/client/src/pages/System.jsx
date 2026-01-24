import { useState, useEffect } from 'react'
import { Settings, RefreshCw, Terminal, FileText, Server, AlertCircle, CheckCircle } from 'lucide-react'
import api from '../services/api'

export default function System() {
  const [status, setStatus] = useState(null)
  const [logs, setLogs] = useState([])
  const [command, setCommand] = useState('')
  const [commandOutput, setCommandOutput] = useState('')
  const [loading, setLoading] = useState(true)
  const [reloading, setReloading] = useState(false)
  const [executing, setExecuting] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const fetchData = async () => {
    try {
      const [statusRes, logsRes] = await Promise.all([
        api.get('/system/status'),
        api.get('/system/logs?lines=50')
      ])
      setStatus(statusRes.data)
      setLogs(logsRes.data.logs || [])
    } catch (err) {
      console.error('Erro ao carregar dados:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleReload = async (module) => {
    setReloading(true)
    setMessage({ type: '', text: '' })
    try {
      await api.post('/system/reload', { module })
      setMessage({ type: 'success', text: 'Configurações recarregadas com sucesso' })
      fetchData()
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Erro ao recarregar' })
    } finally {
      setReloading(false)
    }
  }

  const handleCommand = async (e) => {
    e.preventDefault()
    if (!command.trim()) return
    
    setExecuting(true)
    setCommandOutput('')
    try {
      const res = await api.post('/system/command', { command })
      setCommandOutput(res.data.output || 'Comando executado')
    } catch (err) {
      setCommandOutput(`Erro: ${err.response?.data?.error || err.message}`)
    } finally {
      setExecuting(false)
    }
  }

  const quickCommands = [
    { label: 'PJSIP Endpoints', cmd: 'pjsip show endpoints' },
    { label: 'PJSIP Registrations', cmd: 'pjsip show registrations' },
    { label: 'Canais Ativos', cmd: 'core show channels' },
    { label: 'Versão', cmd: 'core show version' },
  ]

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
        <h1 className="text-2xl font-bold text-gray-900">Sistema</h1>
        <p className="text-gray-500">Configurações e diagnósticos do PABX</p>
      </div>

      {message.text && (
        <div className={`px-4 py-3 rounded-lg flex items-center gap-2 ${
          message.type === 'success' 
            ? 'bg-green-50 border border-green-200 text-green-700'
            : 'bg-red-50 border border-red-200 text-red-700'
        }`}>
          {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          {message.text}
        </div>
      )}

      {/* Status e Ações Rápidas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-primary-600" />
            Status do Asterisk
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500">Conexão AMI</span>
              {status?.asterisk?.connected ? (
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle className="w-4 h-4" /> Conectado
                </span>
              ) : (
                <span className="flex items-center gap-1 text-red-600">
                  <AlertCircle className="w-4 h-4" /> Desconectado
                </span>
              )}
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Versão</span>
              <span className="font-medium">{status?.asterisk?.version || '-'}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Canais Ativos</span>
              <span className="font-medium">{status?.asterisk?.channels || 0}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Chamadas Ativas</span>
              <span className="font-medium">{status?.asterisk?.calls || 0}</span>
            </div>
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <RefreshCw className="w-5 h-5 text-primary-600" />
            Recarregar Configurações
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => handleReload('')}
              disabled={reloading}
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              {reloading && <RefreshCw className="w-4 h-4 animate-spin" />}
              Recarregar Tudo
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleReload('res_pjsip.so')}
                disabled={reloading}
                className="btn-secondary text-sm"
              >
                PJSIP
              </button>
              <button
                onClick={() => handleReload('pbx_config')}
                disabled={reloading}
                className="btn-secondary text-sm"
              >
                Dialplan
              </button>
              <button
                onClick={() => handleReload('app_voicemail.so')}
                disabled={reloading}
                className="btn-secondary text-sm"
              >
                Voicemail
              </button>
              <button
                onClick={() => handleReload('app_queue.so')}
                disabled={reloading}
                className="btn-secondary text-sm"
              >
                Filas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Console CLI */}
      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-primary-600" />
          Console CLI
        </h2>
        
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">Comandos rápidos:</p>
          <div className="flex flex-wrap gap-2">
            {quickCommands.map(qc => (
              <button
                key={qc.cmd}
                onClick={() => { setCommand(qc.cmd); }}
                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors"
              >
                {qc.label}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleCommand} className="flex gap-2 mb-4">
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="Digite um comando CLI do Asterisk..."
            className="input flex-1 font-mono"
          />
          <button
            type="submit"
            disabled={executing || !command.trim()}
            className="btn-primary"
          >
            {executing ? 'Executando...' : 'Executar'}
          </button>
        </form>

        {commandOutput && (
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
            <pre className="whitespace-pre-wrap">{commandOutput}</pre>
          </div>
        )}
      </div>

      {/* Logs */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-600" />
            Últimos Logs
          </h2>
          <button onClick={fetchData} className="btn-secondary text-sm flex items-center gap-1">
            <RefreshCw className="w-4 h-4" />
            Atualizar
          </button>
        </div>
        
        <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-xs overflow-x-auto max-h-96">
          {logs.length === 0 ? (
            <p className="text-gray-500">Nenhum log disponível</p>
          ) : (
            <pre className="whitespace-pre-wrap">
              {logs.slice(-50).join('\n')}
            </pre>
          )}
        </div>
      </div>
    </div>
  )
}
