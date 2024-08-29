import React, { useContext, useEffect } from "react";
import { FaPencilAlt, FaTrash, FaPlus } from 'react-icons/fa'; // Importando ícone para adicionar
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Home = () => {
  const { store, actions } = useContext(Context);


  return (
    <div className="container-fluid">
      <h1 className="text-center">Tarjeta de contactos</h1>
      {/* Botão para adicionar novo contato */}
      <div className="text-center mb-3">
        <Link to="/newContact">
          <button className="btn btn-primary">
            <FaPlus /> Add New Contact
          </button>
        </Link>
      </div>
      {store.contactList && store.contactList.length > 0 ? (
        store.contactList.map((contact) => (
          <div key={contact.id} className="mt-1">
            <ul className="list-group container">
              <li className="list-group-item" style={{ background: "white" }}>
                <div className="d-flex justify-content-between">
                  <div className="d-flex">
                    <img
                      src={`https://robohash.org/${contact.id}?set=set2`}
                      alt="..."
                      className="rounded-circle contact-image"
                      height="100"
                      width="100"
                    />
                    <div className="mx-5">
                      <h6>{contact.name}</h6>
                      <p><i className="me-2 fa-solid fa-location-dot"></i>{contact.address.street}, {contact.address.city}</p>
                      <p><i className="me-2 fa-solid fa-phone-flip"></i>{contact.phone}</p>
                      <p><i className="me-2 fa-solid fa-envelope"></i>{contact.email}</p>
                    </div>
                  </div>
                  <div>
                    <Link to={`/contact/${contact.id}`}>
                      <button className="btn btn-success mx-3"><FaPencilAlt /></button>
                    </Link>
                    <button className="btn btn-danger" onClick={() => actions.removeContacts(contact.id)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        ))
      ) : (
        <p>No contacts available</p>
      )}
    </div>
  );
};
