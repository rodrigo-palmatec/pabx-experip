import { useState, useEffect } from 'react'
import api from '../services/api'

const DAYS = [
  { key: 'monday', label: 'Segunda' },
  { key: 'tuesday', label: 'Terça' },
  { key: 'wednesday', label: 'Quarta' },
  { key: 'thursday', label: 'Quinta' },
  { key: 'friday', label: 'Sexta' },
  { key: 'saturday', label: 'Sábado' },
  { key: 'sunday', label: 'Domingo' }
]

export default function ServiceHours() {
  const [serviceHours, setServiceHours] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
    enabled: true
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await api.get('/serviceHours')
      setServiceHours(response.data)
    } catch (error) {
      console.error('Erro ao carregar horários:', error)
    } finally {
      setLoading(false)
    }
  }

  const parseRanges = (data) => {
    if (!data) return []
    if (typeof data === 'string') {
      try { return JSON.parse(data) } catch { return [] }
    }
    return data
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await api.put(`/serviceHours/${editing.id}`, formData)
      } else {
        await api.post('/serviceHours', formData)
      }
      setShowModal(false)
      resetForm()
      fetchData()
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao salvar')
    }
  }

  const handleEdit = (item) => {
    setEditing(item)
    setFormData({
      name: item.name || '',
      description: item.description || '',
      monday: parseRanges(item.monday),
      tuesday: parseRanges(item.tuesday),
      wednesday: parseRanges(item.wednesday),
      thursday: parseRanges(item.thursday),
      friday: parseRanges(item.friday),
      saturday: parseRanges(item.saturday),
      sunday: parseRanges(item.sunday),
      enabled: item.enabled !== false
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (!confirm('Excluir este horário de atendimento?')) return
    try {
      await api.delete(`/serviceHours/${id}`)
      fetchData()
    } catch (error) {
      alert(error.response?.data?.error || 'Erro ao excluir')
    }
  }

  const resetForm = () => {
    setEditing(null)
    setFormData({
      name: '',
      description: '',
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
      enabled: true
    })
  }

  const addRange = (day) => {
    setFormData(prev => ({
      ...prev,
      [day]: [...prev[day], { start: '08:00', end: '18:00' }]
    }))
  }

  const removeRange = (day, index) => {
    setFormData(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index)
    }))
  }

  const updateRange = (day, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [day]: prev[day].map((r, i) => i === index ? { ...r, [field]: value } : r)
    }))
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64">Carregando...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Horários de Atendimento</h1>
        <button
          onClick={() => { resetForm(); setShowModal(true) }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Novo Horário
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {serviceHours.map((item) => (
          <div key={item.id} className="bg-white shadow rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-500 text-sm">{item.description || 'Sem descrição'}</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${item.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {item.enabled ? 'Ativo' : 'Inativo'}
                </span>
                <button onClick={() => handleEdit(item)} className="text-blue-600 hover:text-blue-900 text-sm">
                  Editar
                </button>
                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900 text-sm">
                  Excluir
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs">
              {DAYS.map(day => {
                const ranges = parseRanges(item[day.key])
                return (
                  <div key={day.key} className="text-center">
                    <div className="font-medium text-gray-600">{day.label.substring(0, 3)}</div>
                    {ranges.length > 0 ? (
                      ranges.map((r, i) => (
                        <div key={i} className="text-green-600">{r.start}-{r.end}</div>
                      ))
                    ) : (
                      <div className="text-gray-400">-</div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editing ? 'Editar Horário' : 'Novo Horário'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nome *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Descrição</label>
                  <input
                    type="text"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {DAYS.map(day => (
                  <div key={day.key} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{day.label}</span>
                      <button
                        type="button"
                        onClick={() => addRange(day.key)}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        + Adicionar período
                      </button>
                    </div>
                    {formData[day.key].length === 0 ? (
                      <span className="text-gray-400 text-sm">Sem atendimento</span>
                    ) : (
                      <div className="space-y-2">
                        {formData[day.key].map((range, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <input
                              type="time"
                              value={range.start}
                              onChange={(e) => updateRange(day.key, idx, 'start', e.target.value)}
                              className="rounded-md border-gray-300"
                            />
                            <span>até</span>
                            <input
                              type="time"
                              value={range.end}
                              onChange={(e) => updateRange(day.key, idx, 'end', e.target.value)}
                              className="rounded-md border-gray-300"
                            />
                            <button
                              type="button"
                              onClick={() => removeRange(day.key, idx)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Remover
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.enabled}
                  onChange={(e) => setFormData({...formData, enabled: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2">Ativo</span>
              </label>

              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
