// Types para Leads
export interface Lead {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  imovelInteresse: string;
  origem: string;
  temperatura: 'frio' | 'morno' | 'quente';
  etapaFunil: 'novo' | 'contato' | 'visita' | 'proposta' | 'negociacao' | 'fechamento';
  dataCriacao: string;
  ultimaInteracao: string;
  responsavel: string;
}

// Types para Imóveis
export interface Imovel {
  id: string;
  codigo: string;
  tipo: 'apartamento' | 'casa' | 'terreno' | 'comercial';
  endereco: string;
  cidade: string;
  estado: string;
  valorVenda: number;
  valorLocacao?: number;
  area: number;
  quartos: number;
  banheiros: number;
  vagas: number;
  status: 'disponivel' | 'reservado' | 'vendido' | 'alugado';
  fotos: string[];
  descricao: string;
}

// Types para Contratos
export interface Contrato {
  id: string;
  tipo: 'venda' | 'locacao';
  imovel: Imovel;
  cliente: Cliente;
  valorTotal: number;
  dataInicio: string;
  dataFim?: string;
  status: 'ativo' | 'pendente' | 'cancelado' | 'concluido';
  clausulas: string[];
  documentos: Documento[];
}

// Types para Clientes
export interface Cliente {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  endereco: string;
  tipo: 'comprador' | 'vendedor' | 'locatario' | 'proprietario';
  dataCadastro: string;
}

// Types para Comissões
export interface Comissao {
  id: string;
  corretor: Corretor;
  contrato: Contrato;
  percentual: number;
  valorComissao: number;
  dataPagamento?: string;
  status: 'pendente' | 'pago' | 'cancelado';
}

// Types para Corretores
export interface Corretor {
  id: string;
  nome: string;
  creci: string;
  email: string;
  telefone: string;
  comissaoAtual: number;
  vendas: number;
}

// Types para Pagamentos
export interface Pagamento {
  id: string;
  contrato: string;
  valor: number;
  dataPagamento: string;
  dataVencimento: string;
  status: 'pendente' | 'pago' | 'atrasado' | 'cancelado';
  metodoPagamento: 'boleto' | 'pix' | 'cartao' | 'transferencia';
  comprovante?: string;
}

// Types para Visitas
export interface Visita {
  id: string;
  lead: Lead;
  imovel: Imovel;
  corretor: Corretor;
  dataHora: string;
  status: 'agendada' | 'realizada' | 'cancelada';
  parecer?: string;
  interesse: 'baixo' | 'medio' | 'alto';
}

// Types para Propostas
export interface Proposta {
  id: string;
  lead: Lead;
  imovel: Imovel;
  valorProposto: number;
  condicoesPagamento: string;
  dataEnvio: string;
  status: 'enviada' | 'aceita' | 'recusada' | 'negociacao';
  observacoes: string;
}

// Types para Email Automation
export interface EmailTemplate {
  id: string;
  nome: string;
  assunto: string;
  corpo: string;
  tipo: 'visita' | 'proposta' | 'contrato' | 'follow-up';
  variaveis: string[];
}

// Types para Documentos
export interface Documento {
  id: string;
  nome: string;
  tipo: string;
  url: string;
  dataUpload: string;
}

// Types para Integração com Portais
export interface IntegracaoPortal {
  id: string;
  portal: 'ZapImoveis' | 'VivaReal' | 'OLX' | 'ImovelWeb';
  status: 'ativo' | 'inativo';
  ultimaSincronizacao: string;
  imoveisPublicados: number;
}

// Types para Funil de Vendas
export interface EtapaFunil {
  etapa: string;
  quantidade: number;
  valor: number;
  taxaConversao: number;
}

// Types para Dashboard Stats
export interface DashboardStats {
  leadsNovos: number;
  visitasAgendadas: number;
  propostasAbertas: number;
  contratosAtivos: number;
  faturamentoMes: number;
  comissoesPendentes: number;
}
