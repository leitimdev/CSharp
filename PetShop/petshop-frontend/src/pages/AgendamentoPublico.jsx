import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Calendar, Dog } from 'lucide-react'
import './AgendamentoPublico.css'

export default function AgendamentoPublico() {
  const [servicos, setServicos] = useState([])
  const [profissionais, setProfissionais] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nomeCliente: '',
    telefoneCliente: '',
    emailCliente: '',
    nomePet: '',
    especiePet: 'Cachorro',
    servicoId: '',
    profissionalId: '',
    dataHora: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const api = axios.create({ baseURL: 'https://localhost:7000/api' })
      const [servsRes, profsRes] = await Promise.all([
        api.get('/servicos'),
        api.get('/profissionais')
      ])
      setServicos(servsRes.data)
      setProfissionais(profsRes.data)
    } catch (error) {
      toast.error('Erro ao carregar dados')
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    try {
      const api = axios.create({ baseURL: 'https://localhost:7000/api' })
      const data = {
        ...formData,
        dataHora: new Date(formData.dataHora).toISOString(),
        servicoId: parseInt(formData.servicoId),
        profissionalId: formData.profissionalId ? parseInt(formData.profissionalId) : null
      }
      
      await api.post('/agendamentos/publico', data)
      toast.success('Agendamento realizado com sucesso! Em breve você receberá uma confirmação via WhatsApp.')
      setFormData({
        nomeCliente: '',
        telefoneCliente: '',
        emailCliente: '',
        nomePet: '',
        especiePet: 'Cachorro',
        servicoId: '',
        profissionalId: '',
        dataHora: ''
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Erro ao realizar agendamento')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="public-page">
      <div className="public-container">
        <div className="public-header">
          <Dog size={48} color="#4f46e5" />
          <h1>Agendar Serviço</h1>
          <p>Preencha os dados abaixo para agendar um horário</p>
        </div>

        <form onSubmit={handleSubmit} className="public-form">
          <div className="form-section">
            <h3>Seus Dados</h3>
            <div className="form-group">
              <label>Nome Completo *</label>
              <input
                className="form-input"
                value={formData.nomeCliente}
                onChange={e => setFormData({...formData, nomeCliente: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Telefone/WhatsApp *</label>
              <input
                className="form-input"
                placeholder="(00) 00000-0000"
                value={formData.telefoneCliente}
                onChange={e => setFormData({...formData, telefoneCliente: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-input"
                value={formData.emailCliente}
                onChange={e => setFormData({...formData, emailCliente: e.target.value})}
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Dados do Pet</h3>
            <div className="form-group">
              <label>Nome do Pet *</label>
              <input
                className="form-input"
                value={formData.nomePet}
                onChange={e => setFormData({...formData, nomePet: e.target.value})}
                required
              />
            </div>
            <div className="form-group">
              <label>Espécie *</label>
              <select
                className="form-input"
                value={formData.especiePet}
                onChange={e => setFormData({...formData, especiePet: e.target.value})}
              >
                <option>Cachorro</option>
                <option>Gato</option>
                <option>Outro</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3>Agendamento</h3>
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
                  <option key={s.id} value={s.id}>
                    {s.nome} - R$ {s.preco.toFixed(2)} ({s.duracaoMinutos} min)
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Profissional (opcional)</label>
              <select
                className="form-input"
                value={formData.profissionalId}
                onChange={e => setFormData({...formData, profissionalId: e.target.value})}
              >
                <option value="">Sem preferência</option>
                {profissionais.map(p => (
                  <option key={p.id} value={p.id}>{p.nome}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Data e Horário *</label>
              <input
                type="datetime-local"
                className="form-input"
                value={formData.dataHora}
                onChange={e => setFormData({...formData, dataHora: e.target.value})}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? 'Agendando...' : 'Confirmar Agendamento'}
          </button>
        </form>
      </div>
    </div>
  )
}
