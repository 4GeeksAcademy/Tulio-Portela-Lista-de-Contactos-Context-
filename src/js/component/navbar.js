import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-dark mb-3 container-fluid-xxl">
      <Link to="/">
        <span className=" text-light  h1">Contactos</span>
      </Link>
      <div className="ml-auto">
        <Link to="/contact">
          <button className="btn btn-success m-4">Add a new contact</button>
        </Link>
      </div>
    </nav>
  );
};