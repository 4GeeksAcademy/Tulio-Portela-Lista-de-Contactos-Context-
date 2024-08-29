import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

const initialValues = {
  name: "",
  email: "",
  username: "",
  address: "",
  phone: "",
};

const NewContact = () => {
  const { store, actions } = useContext(Context);
  const [contact, setContact] = useState(initialValues);
  const [successMessage, setSuccessMessage] = useState(""); // Estado para mensagem de sucesso
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensagem de erro
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      actions.getContact(id).then((contact) => {
        setContact(contact);
      });
    }
  }, [id, actions]);



  const addNewContact = async (event) => {
    event.preventDefault();
    setSuccessMessage(""); // Limpa mensagem de sucesso
    setErrorMessage("");   // Limpa mensagem de erro

    let response;
  try {
    if (!id) {
      response = await actions.addContacts(contact);
    } else {
      response = await actions.updateContacts(contact, id);
    }

    console.log('API response:', response); // Verifique a resposta da API

    if (response) {
      setSuccessMessage("Contact saved successfully!");
      setTimeout(() => navigate("/"), 2000); // Navega após 2 segundos
    } else {
      setErrorMessage("Failed to save contact.");
    }
  } catch (error) {
    console.error('Error while saving contact:', error); // Mensagem de erro detalhada
    setErrorMessage("An error occurred while saving the contact.");
  }
};
const handleContact = (event) => {
  setContact ({...contact,[event.target.name]:event.target.value})
}
  return (
    <div className="container w-100">
      <form className="d-flex flex-column justify-content-center align-items-center" onSubmit={addNewContact}>
        <div className="mb-3 col-6">
          <label htmlFor="InputFullName" className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="InputFullName"
            name="name"
            value={contact.name}
            onChange={(event)=>handleContact(event)}
          />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="InputEmail" className="form-label">Email address</label>
          <input
            type="email"
            className="form-control"
            id="InputEmail"
            name="email"
            value={contact.email}
            onChange={(event)=>handleContact(event)}
          />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="PhoneNumber" className="form-label">Phone Number</label>
          <input
            type="text"
            className="form-control"
            id="PhoneNumber"
            name="phone"
            value={contact.phone}
            onChange={(event)=>handleContact(event)}
          />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="InputStreet" className="form-label">Street</label>
          <input
            type="text"
            className="form-control"
            id="InputStreet"
            name="address"
            value={contact.address}
            onChange={(event)=>handleContact(event)}
          />
        </div>
       
        <button type="submit" className="btn btn-primary col-6">Save</button>
      </form>
      {successMessage && (
        <div className="alert alert-success mt-3">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger mt-3">
          {errorMessage}
        </div>
      )}
      <Link to="/">Back to Contacts</Link>
    </div>
  );
};

export { NewContact };
