import { useState, useEffect } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function Pets() {
  const [pets, setPets] = useState([])
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingPet, setEditingPet] = useState(null)
  const [formData, setFormData] = useState({
    nome: '',
    especie: 'Cachorro',
    raca: '',
    clienteId: ''
  })

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      const [petsRes, clientesRes] = await Promise.all([
        api.get('/pets'),
        api.get('/clientes')
      ])
      setPets(petsRes.data)
      setClientes(clientesRes.data)
    } catch (error) {
      toast.error('Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  function openModal(pet = null) {
    if (pet) {
      setEditingPet(pet)
      setFormData(pet)
    } else {
      setEditingPet(null)
      setFormData({ nome: '', especie: 'Cachorro', raca: '', clienteId: '' })
    }
    setShowModal(true)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      if (editingPet) {
        await api.put(`/pets/${editingPet.id}`, { ...formData, ativo: true })
        toast.success('Pet atualizado!')
      } else {
        await api.post('/pets', formData)
        toast.success('Pet cadastrado!')
      }
      setShowModal(false)
      loadData()
    } catch (error) {
      toast.error('Erro ao salvar pet')
    }
  }

  if (loading) return <div className="loading">Carregando...</div>

  return (
    <div>
      <div className="page-header">
        <h1>Pets</h1>
        <button className="btn btn-primary" onClick={() => openModal()}>
          <Plus size={20} /> Novo Pet
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Espécie</th>
              <th>Raça</th>
              <th>Cliente</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pets.map(pet => (
              <tr key={pet.id}>
                <td>{pet.nome}</td>
                <td>{pet.especie}</td>
                <td>{pet.raca}</td>
                <td>{pet.nomeCliente}</td>
                <td>
                  <button className="btn btn-sm" onClick={() => openModal(pet)}>
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
            <h2>{editingPet ? 'Editar Pet' : 'Novo Pet'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Cliente *</label>
                <select
                  className="form-input"
                  value={formData.clienteId}
                  onChange={e => setFormData({...formData, clienteId: e.target.value})}
                  required
                >
                  <option value="">Selecione...</option>
                  {clientes.map(c => (
                    <option key={c.id} value={c.id}>{c.nome}</option>
                  ))}
                </select>
              </div>
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
                <label>Espécie *</label>
                <select
                  className="form-input"
                  value={formData.especie}
                  onChange={e => setFormData({...formData, especie: e.target.value})}
                >
                  <option>Cachorro</option>
                  <option>Gato</option>
                  <option>Outro</option>
                </select>
              </div>
              <div className="form-group">
                <label>Raça</label>
                <input
                  className="form-input"
                  value={formData.raca}
                  onChange={e => setFormData({...formData, raca: e.target.value})}
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
