import React from 'react';
import BaseComponent from './BaseComponent';

// Required Components
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

class AppHeader extends BaseComponent {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            reMath Demo with React
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    )
  }
}

export default AppHeader;
