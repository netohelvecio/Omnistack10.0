import React from 'react';
import { NavLink } from 'react-router-dom';

import { Container } from './styles';

export default function Header() {
  return (
    <Container>
      <NavLink to="/" exact activeStyle={{ color: '#7159c1' }}>
        LISTA DE DEVS
      </NavLink>

      <NavLink to="/register" activeStyle={{ color: '#7159c1' }}>
        CADASTRAR DEV
      </NavLink>
    </Container>
  );
}
