import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem
} from "reactstrap";

class Header extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <nav>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <div className="navbar-nav">
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink
                    className="nav-item nav-link"
                    activeClassName="selected"
                    to="/"
                  >
                    Isi Buku Tamu
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink className="nav-item nav-link" to="/daftartamu">
                    Lihat Buku Tamu
                  </NavLink>
                </NavItem>
              </Nav>
            </div>
          </Collapse>
        </Navbar>
      </nav>
    );
  }
}

export default Header;
