// appContext.js
import React, { createContext, useState, useEffect } from 'react';
import getState from './flux'; // Importa getState de flux

// Criação do contexto
const Context = createContext(null);

// Componente provedor do contexto
const AppContextProvider = ({ children }) => {
  const [state, setState] = useState(() => getState({
    getStore: () => state.store,
    getActions: () => state.actions,
    setStore: updatedStore => setState(prevState => ({
      store: { ...prevState.store, ...updatedStore },
      actions: { ...prevState.actions },
    })),
  }));

  // Efeito para buscar contatos ao montar o componente
  useEffect(() => {
    
    state.actions.getContacts();
    

   
  }, []);

  return (
    <Context.Provider value={state}>
      {children}
    </Context.Provider>
  );
};

export { Context, AppContextProvider };
