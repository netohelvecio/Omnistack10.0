import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

import history from '../../services/history';
import Header from '../../components/Header';

import { Container, Dev, Options } from './styles';

export default function ListDev() {
  function handleEdit() {
    history.push('/edit');
  }

  function handleDelete() {}

  return (
    <>
      <Header />

      <Container>
        <ul>
          <Dev>
            <header>
              <img
                src="https://api.adorable.io/avatars/124/omegalul.png"
                alt="Avatar"
              />

              <div>
                <strong>Helvécio Neto</strong>
                <span>NodeJS, React, React Native</span>
              </div>
            </header>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse
              numquam voluptatem fugit blanditiis quibusdam, facilis accusamus
              nulla excepturi ratione libero incidunt necessitatibus?
            </p>

            <Options>
              <a href="https://github.com/netohelvecio">
                Acessar perfil GitHub
              </a>

              <div>
                <button type="button">
                  <MdDelete color="#f64c75" size={25} onClick={handleDelete} />
                </button>
                <button type="button">
                  <MdEdit color="#36c95f" size={25} onClick={handleEdit} />
                </button>
              </div>
            </Options>
          </Dev>
        </ul>
      </Container>
    </>
  );
}
