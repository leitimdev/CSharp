import { useState, useEffect } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'
import { Plus, Edit } from 'lucide-react'

export default function Servicos() {
  const [servicos, setServicos] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingServico, setEditingServico] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    duracaoMinutos: ''
  })

  useEffect(() => {
    loadServicos()
  }, [])

  async function loadServicos() {
    try {
      const response = await api.get('/servicos')
      setServicos(response.data)
    } catch (error) {
      toast.error('Erro ao carregar serviços')
    } finally {
      setLoading(false)
    }
  }

  function openModal(servico = null) {
    if (servico) {
      setEditingServico(servico)
      setFormData(servico)
    } else {
      setEditingServico(null)
      setFormData({ nome: '', descricao: '', preco: '', duracaoMinutos: '' })
    }
    setShowModal(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const data = {
        ...formData,
        preco: parseFloat(formData.preco),
        duracaoMinutos: parseInt(formData.duracaoMinutos)
      }
      
      if (editingServico) {
        await api.put(`/servicos/${editingServico.id}`, { ...data, ativo: true })
        toast.success('Serviço atualizado!')
      } else {
        await api.post('/servicos', data)
        toast.success('Serviço criado!')
      }
      setShowModal(false)
      loadServicos()
    } catch (error) {
      toast.error('Erro ao salvar serviço')
    }
  }

  if (loading) return <div className="loading">Carregando...</div>

  return (
    <div>
      <div className="page-header">
        <h1>Serviços</h1>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <Plus size={20} /> Novo Serviço
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Duração</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {servicos.map(servico => (
              <tr key={servico.id}>
                <td>{servico.nome}</td>
                <td>{servico.descricao}</td>
                <td>{servico.duracaoMinutos} min</td>
                <td>R$ {servico.preco.toFixed(2)}</td>
                <td>
                  <button className="btn btn-sm" onClick={() => openModal(servico)}>
                    <Edit size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editingServico ? 'Editar Serviço' : 'Novo Serviço'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome *</label>
                <input
                  className="form-input"
                  value={formData.nome}
                  onChange={e => setFormData({...formData, nome: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Descrição</label>
                <textarea
                  className="form-input"
                  value={formData.descricao}
                  onChange={e => setFormData({...formData, descricao: e.target.value})}
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label>Duração (minutos) *</label>
                <input
                  type="number"
                  className="form-input"
                  value={formData.duracaoMinutos}
                  onChange={e => setFormData({...formData, duracaoMinutos: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Preço (R$) *</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-input"
                  value={formData.preco}
                  onChange={e => setFormData({...formData, preco: e.target.value})}
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
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
