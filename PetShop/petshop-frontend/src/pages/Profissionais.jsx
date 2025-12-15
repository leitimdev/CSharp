import { useState, useEffect } from 'react'
import api from '../services/api'
import { toast } from 'react-toastify'
import { Plus } from 'lucide-react'

export default function Profissionais() {
  const [profissionais, setProfissionais] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfissionais()
  }, [])

  async function loadProfissionais() {
    try {
      const response = await api.get('/profissionais')
      setProfissionais(response.data)
    } catch (error) {
      toast.error('Erro ao carregar profissionais')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="loading">Carregando...</div>

  return (
    <div>
      <div className="page-header">
        <h1>Profissionais</h1>
        <button className="btn btn-primary">
          <Plus size={20} /> Novo Profissional
        </button>
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Email</th>
              <th>Especialidade</th>
            </tr>
          </thead>
          <tbody>
            {profissionais.map(prof => (
              <tr key={prof.id}>
                <td>{prof.nome}</td>
                <td>{prof.telefone}</td>
                <td>{prof.email}</td>
                <td>{prof.especialidade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
