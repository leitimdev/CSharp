import { useState, useEffect } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingCliente, setEditingCliente] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    endereco: '',
    cpf: ''
  })

  useEffect(() => {
    loadClientes()
  }, [])

  async function loadClientes() {
    try {
      const response = await api.get('/clientes')
      setClientes(response.data)
    } catch (error) {
      toast.error('Erro ao carregar clientes')
    } finally {
      setLoading(false)
    }
  }

  function openModal(cliente = null) {
    if (cliente) {
      setEditingCliente(cliente)
      setFormData(cliente)
    } else {
      setEditingCliente(null)
      setFormData({ nome: '', telefone: '', email: '', endereco: '', cpf: '' })
    }
    setShowModal(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (editingCliente) {
        await api.put(`/clientes/${editingCliente.id}`, { ...formData, ativo: true })
        toast.success('Cliente atualizado com sucesso!')
      } else {
        await api.post('/clientes', formData)
        toast.success('Cliente criado com sucesso!')
      }
      setShowModal(false)
      loadClientes()
    } catch (error) {
      toast.error('Erro ao salvar cliente')
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Deseja realmente excluir este cliente?')) return
    
    try {
      await api.delete(`/clientes/${id}`)
      toast.success('Cliente excluído com sucesso!')
      loadClientes()
    } catch (error) {
      toast.error('Erro ao excluir cliente')
    }
  }

  if (loading) return <div className="loading">Carregando...</div>

  return (
    <div>
      <div className="page-header">
        <h1>Clientes</h1>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <Plus size={20} /> Novo Cliente
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>CPF</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.nome}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.email}</td>
                <td>{cliente.cpf}</td>
                <td>
                  <button className="btn btn-sm" onClick={() => openModal(cliente)}>
                    <Edit size={16} />
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(cliente.id)}>
                    <Trash2 size={16} />
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
            <h2>{editingCliente ? 'Editar Cliente' : 'Novo Cliente'}</h2>
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
                <label>Telefone *</label>
                <input
                  className="form-input"
                  value={formData.telefone}
                  onChange={e => setFormData({...formData, telefone: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-input"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Endereço</label>
                <input
                  className="form-input"
                  value={formData.endereco}
                  onChange={e => setFormData({...formData, endereco: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>CPF</label>
                <input
                  className="form-input"
                  value={formData.cpf}
                  onChange={e => setFormData({...formData, cpf: e.target.value})}
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
