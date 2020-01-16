import React from 'react';

import history from '../../services/history';
import AvatarInput from '../../components/AvatarInput';

import { Container, Coordinates } from './styles';

export default function EditDev() {
  function handleCancelation() {
    history.push('/');
  }

  return (
    <Container>
      <strong>Editar Dev</strong>

      <form>
        <AvatarInput name="file" />

        <label htmlFor="name">Nome</label>
        <input type="text" id="name" name="name" />

        <label htmlFor="techs">Tecnologias</label>
        <input type="text" id="techs" name="techs" />

        <label htmlFor="bio">Bio</label>
        <textarea name="bio" id="bio" cols="20" rows="4" />

        <Coordinates>
          <div>
            <label htmlFor="latitude">Latitude</label>
            <input type="text" id="latitude" name="latitude" />
          </div>

          <div>
            <label htmlFor="longitude">Longitude</label>
            <input type="text" id="longitude" name="longitude" />
          </div>
        </Coordinates>

        <button type="submit">Salvar</button>
      </form>

      <button type="button" onClick={handleCancelation}>
        Cancelar
      </button>
    </Container>
  );
}
