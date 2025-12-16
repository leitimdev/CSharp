const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Leads
  getLeads: async () => {
    const response = await fetch(`${API_BASE_URL}/leads`);
    return response.json();
  },
  
  createLead: async (lead: any) => {
    const response = await fetch(`${API_BASE_URL}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    });
    return response.json();
  },
  
  updateLead: async (id: string, lead: any) => {
    const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead)
    });
    return response.ok;
  },
  
  deleteLead: async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
      method: 'DELETE'
    });
    return response.ok;
  },

  // Imóveis
  getImoveis: async () => {
    const response = await fetch(`${API_BASE_URL}/imoveis`);
    return response.json();
  },
  
  createImovel: async (imovel: any) => {
    const response = await fetch(`${API_BASE_URL}/imoveis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(imovel)
    });
    return response.json();
  },

  updateImovel: async (id: string, imovel: any) => {
    const response = await fetch(`${API_BASE_URL}/imoveis/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(imovel)
    });
    return response.ok;
  },

  // Contratos
  getContratos: async () => {
    const response = await fetch(`${API_BASE_URL}/contratos`);
    return response.json();
  },
  
  createContrato: async (contrato: any) => {
    const response = await fetch(`${API_BASE_URL}/contratos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contrato)
    });
    return response.json();
  },

  updateContrato: async (id: string, contrato: any) => {
    const response = await fetch(`${API_BASE_URL}/contratos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contrato)
    });
    return response.ok;
  },

  // Comissões
  getComissoes: async () => {
    const response = await fetch(`${API_BASE_URL}/comissoes`);
    return response.json();
  },
  
  createComissao: async (comissao: any) => {
    const response = await fetch(`${API_BASE_URL}/comissoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comissao)
    });
    return response.json();
  },

  getRankingCorretores: async () => {
    const response = await fetch(`${API_BASE_URL}/comissoes/ranking`);
    return response.json();
  },

  // Corretores
  getCorretores: async () => {
    const response = await fetch(`${API_BASE_URL}/corretores`);
    return response.json();
  },

  // Transações
  getTransacoes: async () => {
    const response = await fetch(`${API_BASE_URL}/transacoes`);
    return response.json();
  },
  
  createTransacao: async (transacao: any) => {
    const response = await fetch(`${API_BASE_URL}/transacoes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transacao)
    });
    return response.json();
  },

  getResumoFinanceiro: async () => {
    const response = await fetch(`${API_BASE_URL}/transacoes/resumo`);
    return response.json();
  },

  // Email Templates
  getEmailTemplates: async () => {
    const response = await fetch(`${API_BASE_URL}/emailtemplates`);
    return response.json();
  },
  
  createEmailTemplate: async (template: any) => {
    const response = await fetch(`${API_BASE_URL}/emailtemplates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(template)
    });
    return response.json();
  },

  updateEmailTemplate: async (id: string, template: any) => {
    const response = await fetch(`${API_BASE_URL}/emailtemplates/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(template)
    });
    return response.ok;
  },

  // Dashboard
  getDashboardStats: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
    return response.json();
  },

  getFunnelData: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/funil`);
    return response.json();
  },

  getSalesData: async () => {
    const response = await fetch(`${API_BASE_URL}/dashboard/vendas`);
    return response.json();
  },

  // Leads - Funil e Temperatura
  getLeadsFunil: async () => {
    const response = await fetch(`${API_BASE_URL}/leads/funil`);
    return response.json();
  },

  getLeadsTemperatura: async () => {
    const response = await fetch(`${API_BASE_URL}/leads/temperatura`);
    return response.json();
  }
};
