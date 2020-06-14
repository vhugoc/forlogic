import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink, NavbarText, Button } from 'reactstrap';
import { FaSignOutAlt } from 'react-icons/fa';

import './style.css';

import { logout } from '../../services/auth';

const NavbarComp = () => {
    const history = useHistory();
    
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);


    function handleLogout() {
        logout();
        history.push('./signin');
    }

    return(
        <div>
            <Navbar color="light" light expand="md" class="navbar">
                <NavbarBrand><Link to="/" className="link">Desafio ForLogic</Link></NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink><Link to="/clients" className="link">Clientes</Link></NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink><Link to="/" className="link">Availiações</Link></NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText><Link onClick={handleLogout} className="signout">Encerrar Sessão</Link></NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default NavbarComp;
