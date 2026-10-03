import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
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
    <section className="fixed-top">
      <div className="nav-line nav-line-top"></div>
      <Navbar
      className={`${scrolled ? 'navbar-scrolled' : ''} ${isAltNav ? 'navbar-alt' : ''}`} 
      expand="lg"
      collapseOnSelect
      data-bs-theme="dark">
        <Container fluid className="px-3 px-md-5">
          <div className="d-flex flex-column">
            <Navbar.Brand as={NavLink} to="/">[ Tobias Krogshede ]</Navbar.Brand>
            <p className='navbar-brand-subtitle'>Software Engineer</p>
          </div>

          <Navbar.Toggle aria-controls="site-nav-links" />
          <Navbar.Collapse id="site-nav-links">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/works">Works</Nav.Link>
              <Nav.Link as={NavLink} to="/interactive">Interactive</Nav.Link>
              <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="nav-line nav-line-bottom"></div>
    </section>
  );
};

export default SiteNav;