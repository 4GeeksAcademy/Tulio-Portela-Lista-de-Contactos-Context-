import React, { createContext, useState, useEffect } from "react";

const Context = createContext(null);

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contactList: [],
      demo: [],
      contact: {},
    },
    actions: {
      getContacts: async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setStore({ contactList: data });
      },
      getContact: async (id) => {
        if (id) {
          const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
          const data = await response.json();
          setStore({ contact: data });
          return data;
        } else {
          setStore({ contact: {} });
          return {};
        }
      },
      addContacts: async (contact) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          method: 'POST',
          body: JSON.stringify(contact),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.ok;
      },
      updateContacts: async (contact, id) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'PUT',
          body: JSON.stringify(contact),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response.ok;
      },
      removeContacts: async (id) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          const { contactList } = getStore();
          setStore({ contactList: contactList.filter(contact => contact.id !== id) });
        }
      },
      changeColor: (index, color) => {
        const store = getStore();
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });
        setStore({ demo: demo });
      },
    },
  };
};

const AppContextProvider = ({ children }) => {
  const [state, setState] = useState(getState({
    getStore: () => state.store,
    getActions: () => state.actions,
    setStore: updatedStore => setState({
      store: Object.assign(state.store, updatedStore),
      actions: { ...state.actions },
    }),
  }));

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

  