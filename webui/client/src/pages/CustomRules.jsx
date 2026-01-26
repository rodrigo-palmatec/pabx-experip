import { useState, useEffect } from 'react'
import { Workflow, Plus, Trash2, Edit2, AlertCircle, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react'
import api from '../services/api'

const CONDITION_TYPES = {
  caller_id: { label: 'Número de Origem', operators: ['equals', 'starts_with', 'ends_with', 'contains', 'regex'] },
  called_number: { label: 'Número Destino', operators: ['equals', 'starts_with', 'ends_with', 'contains', 'regex'] },
  time: { label: 'Horário', operators: ['between', 'before', 'after'] },
  day_of_week: { label: 'Dia da Semana', operators: ['in', 'not_in'] },
  trunk: { label: 'Tronco de Entrada', operators: ['equals', 'not_equals'] },
  extension: { label: 'Ramal', operators: ['equals', 'in'] }
}

const ACTION_TYPES = {
  route_to_queue: { label: 'Encaminhar para Fila', needsTarget: true },
  route_to_ivr: { label: 'Encaminhar para URA', needsTarget: true },
  route_to_peer: { label: 'Encaminhar para Ramal', needsTarget: true },
  route_to_external: { label: 'Encaminhar para Número Externo', needsTarget: true },
  play_audio: { label: 'Tocar Áudio', needsTarget: true },
  set_callerid: { label: 'Alterar Caller ID', needsTarget: true },
  hangup: { label: 'Desligar', needsTarget: false },
  voicemail: { label: 'Caixa Postal', needsTarget: true }
}

function ConditionBuilder({ conditions, onChange, trunks }) {
  const addCondition = () => {
    onChange([...conditions, { type: 'caller_id', operator: 'equals', value: '' }])
  }

  const removeCondition = (index) => {
    onChange(conditions.filter((_, i) => i !== index))
  }

  const updateCondition = (index, field, value) => {
    const updated = [...conditions]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">Condições (SE)</label>
        <button
          type="button"
          onClick={addCondition}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          + Adicionar Condição
        </button>
      </div>
      {conditions.length === 0 ? (
        <p className="text-sm text-gray-500 italic">Nenhuma condição (sempre executa)</p>
      ) : (
        <div className="space-y-2">
          {conditions.map((cond, idx) => (
            <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <select
                value={cond.type}
                onChange={(e) => updateCondition(idx, 'type', e.target.value)}
                className="input w-40"
              >
                {Object.entries(CONDITION_TYPES).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              <select
                value={cond.operator}
                onChange={(e) => updateCondition(idx, 'operator', e.target.value)}
                className="input w-32"
              >
                {CONDITION_TYPES[cond.type]?.operators.map(op => (
                  <option key={op} value={op}>{op}</option>
                ))}
              </select>
              {cond.type === 'trunk' ? (
                <select
                  value={cond.value}
                  onChange={(e) => updateCondition(idx, 'value', e.target.value)}
                  className="input flex-1"
                >
                  <option value="">Selecione um tronco</option>
                  {trunks.map(trunk => (
                    <option key={trunk.name || trunk.endpoint} value={trunk.name || trunk.endpoint}>
                      {trunk.name || trunk.endpoint}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={cond.value}
                  onChange={(e) => updateCondition(idx, 'value', e.target.value)}
                  placeholder={cond.type === 'caller_id' ? 'Número de origem (ex: 48XXXXXXXX)' : 
                           cond.type === 'called_number' ? 'Número destino (ex: 3000)' : 'Valor'}
                  className="input flex-1"
                />
              )}
              <button
                type="button"
                onClick={() => removeCondition(idx)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ActionBuilder({ actions, onChange, peers, trunks }) {
  const addAction = () => {
    onChange([...actions, { type: 'route_to_queue', target: '' }])
  }

  const removeAction = (index) => {
    onChange(actions.filter((_, i) => i !== index))
  }

  const updateAction = (index, field, value) => {
    const updated = [...actions]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-gray-700">Ações (ENTÃO)</label>
        <button
          type="button"
          onClick={addAction}
          className="text-sm text-primary-600 hover:text-primary-700"
        >
          + Adicionar Ação
        </button>
      </div>
      {actions.length === 0 ? (
        <p className="text-sm text-gray-500 italic">Nenhuma ação definida</p>
      ) : (
        <div className="space-y-2">
          {actions.map((action, idx) => (
            <div key={idx} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <select
                value={action.type}
                onChange={(e) => updateAction(idx, 'type', e.target.value)}
                className="input w-48"
              >
                {Object.entries(ACTION_TYPES).map(([key, { label }]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
              {ACTION_TYPES[action.type]?.needsTarget && (
                <>
                  {action.type === 'route_to_peer' ? (
                    <select
                      value={action.target}
                      onChange={(e) => updateAction(idx, 'target', e.target.value)}
                      className="input flex-1"
                    >
                      <option value="">Selecione um ramal</option>
                      {peers.map(peer => (
                        <option key={peer.extension} value={peer.extension}>
                          {peer.extension} - {peer.name}
                        </option>
                      ))}
                    </select>
                  ) : action.type === 'route_to_external' ? (
                    <input
                      type="text"
                      value={action.target}
                      onChange={(e) => updateAction(idx, 'target', e.target.value)}
                      placeholder="Número externo (ex: 48XXXXXXXX)"
                      className="input flex-1"
                    />
                  ) : (
                    <input
                      type="text"
                      value={action.target}
                      onChange={(e) => updateAction(idx, 'target', e.target.value)}
                      placeholder="Destino/Valor"
                      className="input flex-1"
                    />
                  )}
                </>
              )}
              <button
                type="button"
                onClick={() => removeAction(idx)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function RuleModal({ isOpen, onClose, onSave, rule, peers, trunks }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    conditions: [],
    actions: [],
    priority: 0,
    enabled: true
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (rule) {
      setForm({
        name: rule.name || '',
        description: rule.description || '',
        conditions: rule.conditions ? JSON.parse(rule.conditions) : [],
        actions: rule.actions ? JSON.parse(rule.actions) : [],
        priority: rule.priority || 0,
        enabled: rule.enabled !== false
      })
    } else {
      setForm({
        name: '',
        description: '',
        conditions: [],
        actions: [],
        priority: 0,
        enabled: true
      })
    }
  }, [rule])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await onSave({
        ...form,
        conditions: JSON.stringify(form.conditions),
        actions: JSON.stringify(form.actions)
      })
      onClose()
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-semibold">
            {rule ? 'Editar Regra' : 'Nova Regra Customizada'}
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
              <input
                type="number"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: parseInt(e.target.value) || 0 })}
                className="input"
              />
              <p className="text-xs text-gray-500 mt-1">Maior = executa primeiro</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="input"
              rows={2}
            />
          </div>

          <ConditionBuilder
            conditions={form.conditions}
            onChange={(conditions) => setForm({ ...form, conditions })}
            trunks={trunks}
          />

          <ActionBuilder
            actions={form.actions}
            onChange={(actions) => setForm({ ...form, actions })}
            peers={peers}
            trunks={trunks}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="enabled"
              checked={form.enabled}
              onChange={(e) => setForm({ ...form, enabled: e.target.checked })}
              className="rounded border-gray-300 text-primary-600"
            />
            <label htmlFor="enabled" className="text-sm font-medium text-gray-700">
              Regra Habilitada
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

export default function CustomRules() {
  const [rules, setRules] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editing, setEditing] = useState(null)
  const [peers, setPeers] = useState([])
  const [trunks, setTrunks] = useState([])
  const [expandedRule, setExpandedRule] = useState(null)

  const fetchRules = async () => {
    try {
      const res = await api.get('/customRules')
      setRules(res.data)
    } catch (err) {
      setError('Erro ao carregar regras')
    } finally {
      setLoading(false)
    }
  }

  const fetchPeers = async () => {
    try {
      // Usar API pública que funciona
      const res = await api.get('/extension-status')
      setPeers(res.data)
    } catch (err) {
      console.error('Erro ao carregar ramais:', err)
    }
  }

  const fetchTrunks = async () => {
    try {
      // Buscar troncos do Asterisk
      const res = await api.get('/trunks')
      setTrunks(res.data || [])
    } catch (err) {
      console.error('Erro ao carregar troncos:', err)
    }
  }

  useEffect(() => {
    fetchRules()
    fetchPeers()
    fetchTrunks()
  }, [])

  const handleSave = async (data) => {
    try {
      if (editing) {
        await api.put(`/customRules/${editing.id}`, data)
      } else {
        await api.post('/customRules', data)
      }
      fetchRules()
      setError('')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao salvar regra')
      throw err
    }
  }

  const handleDelete = async (id, name) => {
    if (!confirm(`Excluir regra "${name}"?`)) return
    try {
      await api.delete(`/customRules/${id}`)
      fetchRules()
      setError('')
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao excluir regra')
    }
  }

  const toggleEnabled = async (rule) => {
    try {
      await api.put(`/customRules/${rule.id}`, { enabled: !rule.enabled })
      fetchRules()
    } catch (err) {
      setError('Erro ao atualizar regra')
    }
  }

  const getConditionsSummary = (conditionsJson) => {
    try {
      const conditions = JSON.parse(conditionsJson || '[]')
      if (conditions.length === 0) return 'Sempre'
      return `${conditions.length} condição(ões)`
    } catch {
      return '-'
    }
  }

  const getActionsSummary = (actionsJson) => {
    try {
      const actions = JSON.parse(actionsJson || '[]')
      if (actions.length === 0) return 'Nenhuma'
      return actions.map(a => ACTION_TYPES[a.type]?.label || a.type).join(', ')
    } catch {
      return '-'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Regras Customizadas</h1>
          <p className="text-gray-500">Regras avançadas de roteamento e manipulação de chamadas</p>
        </div>
        <button 
          onClick={() => { setEditing(null); setModalOpen(true) }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nova Regra
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
        ) : rules.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Workflow className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma regra customizada configurada</p>
            <p className="text-sm mt-1">Crie regras para automatizar o roteamento de chamadas</p>
          </div>
        ) : (
          <div className="divide-y">
            {rules.map(rule => (
              <div key={rule.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setExpandedRule(expandedRule === rule.id ? null : rule.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      {expandedRule === rule.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{rule.name}</span>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                          Prioridade: {rule.priority}
                        </span>
                        {rule.enabled ? (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                            Ativo
                          </span>
                        ) : (
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
                            Inativo
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {getConditionsSummary(rule.conditions)} → {getActionsSummary(rule.actions)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleEnabled(rule)}
                      className={`p-2 rounded-lg ${rule.enabled ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'}`}
                      title={rule.enabled ? 'Desativar' : 'Ativar'}
                    >
                      {rule.enabled ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => { setEditing(rule); setModalOpen(true) }}
                      className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(rule.id, rule.name)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                {expandedRule === rule.id && (
                  <div className="mt-4 pl-10 space-y-3">
                    {rule.description && (
                      <p className="text-sm text-gray-600">{rule.description}</p>
                    )}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 p-3 rounded">
                        <h4 className="font-medium mb-2">Condições</h4>
                        <pre className="text-xs text-gray-600 overflow-auto">
                          {JSON.stringify(JSON.parse(rule.conditions || '[]'), null, 2)}
                        </pre>
                      </div>
                      <div className="bg-blue-50 p-3 rounded">
                        <h4 className="font-medium mb-2">Ações</h4>
                        <pre className="text-xs text-gray-600 overflow-auto">
                          {JSON.stringify(JSON.parse(rule.actions || '[]'), null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <RuleModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditing(null) }}
        onSave={handleSave}
        rule={editing}
        peers={peers}
        trunks={trunks}
      />
    </div>
  )
}
