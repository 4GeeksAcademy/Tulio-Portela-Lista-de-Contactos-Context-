import React, { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/demo.css";

const initialValues = {
  name: "",
  email: "",
  username: "",
  address: { street: "", city: "" },
  phone: "",
};

const NewContact = () => {
  const { store, actions } = useContext(Context);
  const [contact, setContact] = useState(initialValues);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      actions.getContact(id).then((contact) => {
        setContact(contact);
      });
    }
  }, [id]);

  const handleContact = (event) => {
    const { name, value } = event.target;
    if (name === "street" || name === "city") {
      setContact({ ...contact, address: { ...contact.address, [name]: value } });
    } else {
      setContact({ ...contact, [name]: value });
    }
  };

  const addNewContact = async (event) => {
    event.preventDefault();
    let response;
    if (!id) {
      response = await actions.addContacts(contact);
    } else {
      response = await actions.updateContacts(contact, id);
    }
    if (response) navigate("/");
  };

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
            onChange={handleContact}
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
            onChange={handleContact}
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
            onChange={handleContact}
          />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="InputStreet" className="form-label">Street</label>
          <input
            type="text"
            className="form-control"
            id="InputStreet"
            name="street"
            value={contact.address.street}
            onChange={handleContact}
          />
        </div>
        <div className="mb-3 col-6">
          <label htmlFor="InputCity" className="form-label">City</label>
          <input
            type="text"
            className="form-control"
            id="InputCity"
            name="city"
            value={contact.address.city}
            onChange={handleContact}
          />
        </div>
        <button type="submit" className="btn btn-primary col-6">Save</button>
      </form>
      <Link to="/">Volver a contactos</Link>
    </div>
  );
};

export { NewContact };
