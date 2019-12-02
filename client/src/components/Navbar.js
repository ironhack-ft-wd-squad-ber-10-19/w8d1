import React from "react";
import { Link } from "react-router-dom";
import { Navbar as Nav } from "react-bootstrap";

const Navbar = () => {
  return (
    <Nav className="nav justify-content-end" bg="primary">
      <Link to="/">Home</Link>
      <Link to="/projects">Projects</Link>
    </Nav>
  );
};

export default Navbar;
