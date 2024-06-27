const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		demo: [
		  {
			title: "FIRST",
			background: "white",
			initial: "white",
		  },
		  {
			title: "SECOND",
			background: "white",
			initial: "white",
		  },
		],
		baseURL: "https://playground.4geeks.com/apis/fake/contact/",
		contactList: [],
		contact: [],
	  },
	  actions: {
		exampleFunction: () => {
		  getActions().changeColor(0, "green");
		},
		loadSomeData: () => {},
		changeColor: (index, color) => {
		  const store = getStore();
		  const demo = store.demo.map((elm, i) => {
			if (i === index) elm.background = color;
			return elm;
		  });
		  setStore({ demo: demo });
		},
		getContacts: async function () {
		  let store = getStore();
		  try {
			const response = await fetch(`${store.baseURL}/agenda/Jssolar`);
			if (response.ok) {
			  let data = await response.json();
			  setStore({ contactList: data });
			} else if (response.status === 404) {
			  await getActions().createAgenda();
			}
		  } catch (error) {
			console.log(error);
		  }
		},
		createAgenda: async function () {
		  let store = getStore();
		  try {
			const response = await fetch(`${store.baseURL}`, {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify({
				"agenda_slug": "Jssolar",
				"full_name": "First Contact",
				"email": "first.contact@example.com",
				"phone": "123-456-7890",
				"address": "123 Main St"
			  }),
			});
			if (response.ok) {
			  getActions().getContacts();
			}
		  } catch (error) {
			console.log(error);
		  }
		},
		getContact: async function (id) {
		  let store = getStore();
		  try {
			const response = await fetch(`${store.baseURL}/${id}`);
			if (response.ok) {
			  let data = await response.json();
			  setStore({ contact: data });
			}
		  } catch (error) {
			console.log(error);
		  }
		},
		addContacts: async function (data) {
		  let store = getStore();
		  try {
			const response = await fetch(`${store.baseURL}`, {
			  method: "POST",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify(data),
			});
			if (response.ok) {
			  getActions().getContacts();
			  return true;
			} else {
			  return false;
			}
		  } catch (error) {
			console.log(error);
		  }
		},
		removeContacts: async function (id) {
		  let store = getStore();
		  try {
			const response = await fetch(`${store.baseURL}${id}`, {
			  method: "DELETE",
			  headers: {
				"Content-Type": "application/json",
			  },
			});
			if (response.ok) {
			  getActions().getContacts();
			}
		  } catch (error) {
			console.log(error);
		  }
		},
		updateContacts: async function (data, id) {
		  let store = getStore();
		  try {
			const response = await fetch(`${store.baseURL}${id}`, {
			  method: "PUT",
			  headers: {
				"Content-Type": "application/json",
			  },
			  body: JSON.stringify(data),
			});
			if (response.ok) {
			  getActions().getContacts();
			  return true;
			} else {
			  return false;
			}
		  } catch (error) {
			console.log(error);
		  }
		},
	  },
	};
  };
  
  export default getState;
  