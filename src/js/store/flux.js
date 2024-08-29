const getState = ({ getStore, getActions, setStore }) => {
    return {
      store: {
        baseURL: "https://playground.4geeks.com/contact/agendas/tulioportela/contacts",
        contactList: [],
        contact: {},
      },
      actions: {
        getContacts: async () => {
          console.log('Fetching contacts'); // Mensagem de depuração
          const store = getStore();
          try {
            const response = await fetch(store.baseURL, {
              headers: { 'Accept': 'application/json' },
            });
            if (response.ok) {
              const data = await response.json(); 
              console.log(data)
setStore({ contactList: Array.isArray(data.contacts) ? data.contacts : [] });

              console.log("Contacts fetched successfully:", data);
            } else {
              console.error(`Failed to fetch contacts. Status: ${response.status} ${response.statusText}`);
            }
          } catch (error) {
            console.error('Error fetching contacts:', error);
          }
        },
  
        getContact: async (id) => {
          console.log(`Fetching contact with ID: ${id}`); // Mensagem de depuração
          const store = getStore();
          if (!id) {
            setStore({ contact: {} });
            return {};
          }
          try {
            const response = await fetch(`${store.baseURL}/${id}`, {
              headers: { 'Accept': 'application/json' },
            });
            if (response.ok) {
              const data = await response.json();
              setStore({ contact: data });
              console.log("Contact fetched successfully:", data);
              return data;
            } else {
              console.error(`Failed to fetch contact. Status: ${response.status} ${response.statusText}`);
              return {};
            }
          } catch (error) {
            console.error('Error fetching contact:', error);
            return {};
          }
        },
  
        addContacts: async (contact) => {
          console.log('Adding contact:', contact); // Mensagem de depuração
          const store = getStore();
          try {
            const response = await fetch(store.baseURL, {
              method: 'POST',
              body: JSON.stringify(contact),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            });
            if (response.ok) {
              await getActions().getContacts(); // Atualizar lista após adicionar
              return true;
            } else {
              console.error('Failed to add contact');
              return false;
            }
          } catch (error) {
            console.error('Error adding contact:', error);
            return false;
          }
        },
  
        updateContacts: async (contact, id) => {
          console.log(`Updating contact with ID: ${id}`, contact); // Mensagem de depuração
          const store = getStore();
          try {
            const response = await fetch(`${store.baseURL}/${id}`, {
              method: 'PUT',
              body: JSON.stringify(contact),
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
            });
            if (response.ok) {
              await getActions().getContacts(); // Atualizar lista após atualizar
              return true;
            } else {
              console.error('Failed to update contact');
              return false;
            }
          } catch (error) {
            console.error('Error updating contact:', error);
            return false;
          }
        },
  
        removeContacts: async (id) => {
          console.log(`Removing contact with ID: ${id}`); // Mensagem de depuração
          const store = getStore();
          try {
            const response = await fetch(`${store.baseURL}/${id}`, {
              method: 'DELETE',
            });
            if (response.ok) {
              await getActions().getContacts(); // Atualizar lista após remover
              console.log(`Contact with ID ${id} deleted successfully`);
            } else {
              console.error('Failed to delete contact');
            }
          } catch (error) {
            console.error('Error deleting contact:', error);
          }
        },
      },
    };
  };
  
  export default getState;
