import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Lead, Imovel, Contrato, Comissao, Corretor, Visita, Proposta } from '../types';
import { api } from '../services/api';

interface AppContextType {
  leads: Lead[];
  imoveis: Imovel[];
  contratos: Contrato[];
  comissoes: Comissao[];
  corretores: Corretor[];
  visitas: Visita[];
  propostas: Proposta[];
  addLead: (lead: Lead) => Promise<void>;
  updateLead: (id: string, lead: Partial<Lead>) => Promise<void>;
  addImovel: (imovel: Imovel) => Promise<void>;
  addContrato: (contrato: Contrato) => Promise<void>;
  addComissao: (comissao: Comissao) => Promise<void>;
  refreshLeads: () => Promise<void>;
  refreshImoveis: () => Promise<void>;
  refreshContratos: () => Promise<void>;
  refreshComissoes: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [comissoes, setComissoes] = useState<Comissao[]>([]);
  const [corretores, setCorretores] = useState<Corretor[]>([]);
  const [visitas, setVisitas] = useState<Visita[]>([]);
  const [propostas, setPropostas] = useState<Proposta[]>([]);

  // Carregar dados da API ao iniciar
  useEffect(() => {
    refreshLeads();
    refreshImoveis();
    refreshContratos();
    refreshComissoes();
    loadCorretores();
  }, []);

  const refreshLeads = async () => {
    try {
      const data = await api.getLeads();
      setLeads(data);
    } catch (error) {
      console.error('Erro ao carregar leads:', error);
    }
  };

  const refreshImoveis = async () => {
    try {
      const data = await api.getImoveis();
      setImoveis(data);
    } catch (error) {
      console.error('Erro ao carregar imóveis:', error);
    }
  };

  const refreshContratos = async () => {
    try {
      const data = await api.getContratos();
      setContratos(data);
    } catch (error) {
      console.error('Erro ao carregar contratos:', error);
    }
  };

  const refreshComissoes = async () => {
    try {
      const data = await api.getComissoes();
      setComissoes(data);
    } catch (error) {
      console.error('Erro ao carregar comissões:', error);
    }
  };

  const loadCorretores = async () => {
    try {
      const data = await api.getCorretores();
      setCorretores(data);
    } catch (error) {
      console.error('Erro ao carregar corretores:', error);
    }
  };

  const addLead = async (lead: Lead) => {
    try {
      const newLead = await api.createLead(lead);
      setLeads([...leads, newLead]);
    } catch (error) {
      console.error('Erro ao adicionar lead:', error);
    }
  };

  const updateLead = async (id: string, updatedLead: Partial<Lead>) => {
    try {
      const fullLead = leads.find(l => l.id === id);
      if (fullLead) {
        await api.updateLead(id, { ...fullLead, ...updatedLead });
        setLeads(leads.map(lead => lead.id === id ? { ...lead, ...updatedLead } : lead));
      }
    } catch (error) {
      console.error('Erro ao atualizar lead:', error);
    }
  };

  const addImovel = async (imovel: Imovel) => {
    try {
      const newImovel = await api.createImovel(imovel);
      setImoveis([...imoveis, newImovel]);
    } catch (error) {
      console.error('Erro ao adicionar imóvel:', error);
    }
  };

  const addContrato = async (contrato: Contrato) => {
    try {
      const newContrato = await api.createContrato(contrato);
      setContratos([...contratos, newContrato]);
    } catch (error) {
      console.error('Erro ao adicionar contrato:', error);
    }
  };

  const addComissao = async (comissao: Comissao) => {
    try {
      const newComissao = await api.createComissao(comissao);
      setComissoes([...comissoes, newComissao]);
    } catch (error) {
      console.error('Erro ao adicionar comissão:', error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        leads,
        imoveis,
        contratos,
        comissoes,
        corretores,
        visitas,
        propostas,
        addLead,
        updateLead,
        addImovel,
        addContrato,
        addComissao,
        refreshLeads,
        refreshImoveis,
        refreshContratos,
        refreshComissoes
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
