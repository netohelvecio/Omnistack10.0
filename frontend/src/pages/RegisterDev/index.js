import React from 'react';
import { MdAdd } from 'react-icons/md';

import Header from '../../components/Header';

import { Container } from './styles';

export default function RegisterDev() {
  return (
    <>
      <Header />

      <Container>
        <strong>Cadastrar Dev</strong>

        <form>
          <label htmlFor="github_username">Usuário do GitHub</label>
          <input
            type="text"
            id="github_username"
            name="github_username"
            placeholder="Digite o usuário do GitHub"
          />

          <label htmlFor="techs">Tecnologias</label>
          <input
            type="text"
            id="techs"
            name="techs"
            placeholder="Tecnologias que domina"
          />

          <div>
            <div>
              <label htmlFor="latitude">Latitude</label>
              <input
                type="text"
                id="latitude"
                name="latitude"
                placeholder="Digite a latitude"
              />
            </div>

            <div>
              <label htmlFor="longitude">Longitude</label>
              <input
                type="text"
                id="longitude"
                name="longitude"
                placeholder="Digite a longitude"
              />
            </div>
          </div>

          <button type="submit">
            <MdAdd color="#fff" size={25} /> Cadastrar
          </button>
        </form>
      </Container>
    </>
  );
}
