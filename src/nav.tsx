import React from "react";
import "./nav.css";
import { NavLink } from "react-router-dom";
export interface NavbarProps {}

function myFunction() {
  var x = document.getElementById("myTopnav");
  if (x!.className === "topnav") {
    x!.className += " responsive";
  } else {
    x!.className = "topnav";
  }
}

const Navbar: React.SFC<NavbarProps> = () => {
  return (
    <div className="topnav" id="myTopnav">
      <a style={{ cursor: "default" }}>Resnal</a>
      <NavLink to="/batch" activeClassName="active">
        Batchwize Results
      </NavLink>
      <NavLink
        to="/subject"
        className="link"
        activeClassName="active"
        href="/subject"
      >
        Subjectwize Results
      </NavLink>
      <a
        href="javascript:void(0);"
        className="icon link"
        onClick={() => myFunction()}
      >
        <i className="fa fa-bars"></i>
      </a>
    </div>
  );
};

export default Navbar;
