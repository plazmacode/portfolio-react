import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './SiteNav.css';
import { NavLink } from 'react-router';
import { useLocation } from 'react-router';

const SiteNav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)

  const location = useLocation();
  const pages = ["/"]
  const pathName = location.pathname
  const isAltNav = !pages.includes(pathName);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Navbar
    className={`${scrolled ? 'navbar-scrolled' : ''} ${isAltNav ? 'navbar-alt' : ''}`} 
    expand="lg"
    fixed="top">
      <Container fluid className="px-5">
        <Navbar.Brand as={NavLink} to="/">Tobias Krogshede</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/about">About</Nav.Link>
          <NavDropdown title="FloraHive" id="collapsible-nav-dropdown">
            <NavDropdown.Item as={NavLink} to="/florahive">FloraHive</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/florahive-metrics">FloraHive Metrics</NavDropdown.Item>
            <NavDropdown.Item as={NavLink} to="/gamebox">GameBox</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default SiteNav;