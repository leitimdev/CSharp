import { useState, useEffect } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'
import { Plus, Calendar } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function Agendamentos() {
  const [agendamentos, setAgendamentos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [pets, setPets] = useState([])
  const [servicos, setServicos] = useState([])
  const [profissionais, setProfissionais] = useState([])
  const [formData, setFormData] = useState({
    dataHora: '',
    petId: '',
    servicoId: '',
    profissionalId: '',
    observacoes: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const hoje = new Date()
      const dataInicio = new Date(hoje.setDate(hoje.getDate() - 7))
      const dataFim = new Date(hoje.setDate(hoje.getDate() + 30))
      
      const [agendRes, petsRes, servsRes, profsRes] = await Promise.all([
        api.get(`/agendamentos?dataInicio=${dataInicio.toISOString()}&dataFim=${dataFim.toISOString()}`),
        api.get('/pets'),
        api.get('/servicos'),
        api.get('/profissionais')
      ])
      
      setAgendamentos(agendRes.data)
      setPets(petsRes.data)
      setServicos(servsRes.data)
      setProfissionais(profsRes.data)
    } catch (error) {
      toast.error('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const data = {
        ...formData,
        dataHora: new Date(formData.dataHora).toISOString(),
        petId: parseInt(formData.petId),
        servicoId: parseInt(formData.servicoId),
        profissionalId: parseInt(formData.profissionalId)
      }
      
      await api.post('/agendamentos', data)
      toast.success('Agendamento criado com sucesso!')
      setShowModal(false)
      loadData()
      setFormData({ dataHora: '', petId: '', servicoId: '', profissionalId: '', observacoes: '' })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao criar agendamento')
    }
  }

  async function handleConfirmar(id) {
    try {
      await api.post(`/agendamentos/${id}/confirmar`)
      toast.success('Agendamento confirmado!')
      loadData()
    } catch (error) {
      toast.error('Erro ao confirmar agendamento')
    }
  }

  async function handleCancelar(id) {
    if (!window.confirm('Deseja realmente cancelar este agendamento?')) return
    
    try {
      await api.post(`/agendamentos/${id}/cancelar`)
      toast.success('Agendamento cancelado!')
      loadData()
    } catch (error) {
      toast.error('Erro ao cancelar agendamento')
    }
  }

  function getStatusBadge(status) {
    const badges = {
      'Agendado': 'badge-warning',
      'Confirmado': 'badge-info',
      'Concluido': 'badge-success',
      'Cancelado': 'badge-danger'
    }
    return badges[status] || 'badge-info'
  }

  if (loading) return <div className="loading">Carregando...</div>

  return (
    <div>
      <div className="page-header">
        <h1>Agendamentos</h1>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <Plus size={20} /> Novo Agendamento
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>Cliente</th>
              <th>Pet</th>
              <th>Serviço</th>
              <th>Profissional</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {agendamentos.map(agend => (
              <tr key={agend.id}>
                <td>{format(new Date(agend.dataHora), "dd/MM/yyyy HH:mm")}</td>
                <td>{agend.nomeCliente}</td>
                <td>{agend.nomePet}</td>
                <td>{agend.nomeServico}</td>
                <td>{agend.nomeProfissional}</td>
                <td>
                  <span className={`badge ${getStatusBadge(agend.status)}`}>
                    {agend.status}
                  </span>
                </td>
                <td>
                  {agend.status === 'Agendado' && (
                    <>
                      <button 
                        className="btn btn-sm btn-success" 
                        onClick={() => handleConfirmar(agend.id)}
                      >
                        Confirmar
                      </button>
                      <button 
                        className="btn btn-sm btn-danger" 
                        onClick={() => handleCancelar(agend.id)}
                      >
                        Cancelar
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Novo Agendamento</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Pet *</label>
                <select
                  className="form-input"
                  value={formData.petId}
                  onChange={e => setFormData({...formData, petId: e.target.value})}
                  required
                >
                  <option value="">Selecione...</option>
                  {pets.map(p => (
                    <option key={p.id} value={p.id}>{p.nome} - {p.nomeCliente}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Serviço *</label>
                <select
                  className="form-input"
                  value={formData.servicoId}
                  onChange={e => setFormData({...formData, servicoId: e.target.value})}
                  required
                >
                  <option value="">Selecione...</option>
                  {servicos.map(s => (
                    <option key={s.id} value={s.id}>{s.nome} - R$ {s.preco.toFixed(2)}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Profissional *</label>
                <select
                  className="form-input"
                  value={formData.profissionalId}
                  onChange={e => setFormData({...formData, profissionalId: e.target.value})}
                  required
                >
                  <option value="">Selecione...</option>
                  {profissionais.map(p => (
                    <option key={p.id} value={p.id}>{p.nome}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Data e Hora *</label>
                <input
                  type="datetime-local"
                  className="form-input"
                  value={formData.dataHora}
                  onChange={e => setFormData({...formData, dataHora: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Observações</label>
                <textarea
                  className="form-input"
                  value={formData.observacoes}
                  onChange={e => setFormData({...formData, observacoes: e.target.value})}
                  rows="3"
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Agendar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
