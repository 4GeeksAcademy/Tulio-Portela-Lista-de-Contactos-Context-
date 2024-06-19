import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

const initialValues = {
  full_name: "",
  email: "",
  agenda_slug: "Jssolar",
  address: "",
  phone: "",
};

const NewContact = () => {
  const { store, actions } = useContext(Context);
  const [contact, setContact] = useState(initialValues);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    //  datos de la API
    editContact();
  }, []);
  const editContact = async () => {
    if (id) {
      await actions.getContact(id);
    //   console.log(store.contact);
      setContact(store.contact);
    } else {
      await actions.getContact(null);
    //   console.log(store.contact);
    }
  };

  const handleContact = (event) => {
    setContact({ ...contact, [event.target.name]: event.target.value });
  };
  const addNewContact = async (event) => {
    event.preventDefault();
    if (id == undefined) {
      const response = await actions.addContacts(contact);
      if (response) navigate("/");
    } else {
      const response = await actions.updateContacts(contact, id);
      setContact(initialValues);
      if (response) navigate("/");
    }
  };
  const filterById = (items, id) => {
    return items.filter((item) => item.id === id);
  };
  return (
    <div className="container w-100">
      <form
        className="d-flex flex-column justify-content-center align-items-center"
        onSubmit={addNewContact}
      >
        <div className="mb-3 col-6">
          <label htmlFor="InputFullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="InputFullName"
            name="full_name"
            value={contact.full_name}
            onChange={(event) => handleContact(event)}
          />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="InputEmail" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="InputEmail"
            aria-describedby="emailHelp"
            name="email"
            value={contact.email}
            onChange={(event) => handleContact(event)}
          />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="PhoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="PhoneNumber"
            name="phone"
            value={contact.phone}
            onChange={(event) => handleContact(event)}
          />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="InputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="InputAddress"
            name="address"
            value={contact.address}
            onChange={(event) => handleContact(event)}
          />
        </div>
        <button type="submit" className="btn btn-primary col-6">
          Save
        </button>
      </form>
      <Link to="/">Volver a contactos</Link>
    </div>
  );
};

export default NewContact;