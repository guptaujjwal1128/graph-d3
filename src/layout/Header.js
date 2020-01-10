import React,{Component} from 'react';
import { Navbar,Nav,NavDropdown } from 'react-bootstrap';
import '../App.css';

class Header extends Component{
  render(){
    return(
      <div>
      <Navbar bg="light" expand="md" variant="light">
      <Navbar.Brand href="/">Visualizer</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto" variant="pills">
      <Nav.Link href="/">Scatter Plot</Nav.Link>
      <Nav.Link href="/guide">Quick Guide</Nav.Link>
      <Nav.Link href="/feedback">Feedback</Nav.Link>
      </Nav>
      </Navbar.Collapse>
      </Navbar>
      </div>
    );
  }
}

export default Header;
