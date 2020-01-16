import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import redirect from '../../services/history';
import api from '../../services/api';
// import AvatarInput from '../../components/AvatarInput';

import { Container, Coordinates, AvatarContainer, AvatarInput } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  techs: Yup.string().required('As tecnologias são obrigatórias'),
  bio: Yup.string().required('Bio é obrigatória'),
  latitude: Yup.number()
    .typeError('Compo deve ser um valor númerico')
    .required('A latitude é obrtigatória'),
  longitude: Yup.number()
    .typeError('Compo deve ser um valor númerico')
    .required('A longitude é obrtigatória'),
});

export default function EditDev({ history }) {
  const [initalData, setInitialData] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const { techs, name, bio, avatar_url, _id } = history.location.state;

        setInitialData({
          latitude,
          longitude,
          techs,
          name,
          bio,
          avatar_url,
          _id,
        });
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  function handleCancelation() {
    redirect.push('/');
  }

  async function handleSubmit({ name, bio, techs, latitude, longitude }) {
    try {
      const response = await api.put(`/devs/${initalData._id}`, {
        name,
        bio,
        techs,
        latitude,
        longitude,
      });

      toast.success('Dev atualizado!');
    } catch (error) {
      console.log(error);
      toast.error('Error ao atualizar dev, verfique os dados');
    }
  }

  return (
    <Container>
      <strong>Editar Dev</strong>

      <AvatarContainer>
        <AvatarInput>
          <label htmlFor="avatar">
            <img
              src={
                initalData.avatar_url ||
                'https://api.adorable.io/avatars/140/kappa.png'
              }
              alt=""
            />

            <input type="file" id="avatar" accept="image/*" />
          </label>
        </AvatarInput>
      </AvatarContainer>

      <Form onSubmit={handleSubmit} schema={schema} initialData={initalData}>
        <label htmlFor="name">Nome</label>
        <Input type="text" id="name" name="name" />

        <label htmlFor="techs">
          Tecnologias (separe as teconolgias por vírgula)
        </label>
        <Input type="text" id="techs" name="techs" />

        <label htmlFor="bio">Bio</label>
        <Input name="bio" id="bio" type="text" multiline rows={6} />

        <Coordinates>
          <div>
            <label htmlFor="latitude">Latitude</label>
            <Input type="number" step="any" id="latitude" name="latitude" />
          </div>

          <div>
            <label htmlFor="longitude">Longitude</label>
            <Input type="number" step="any" id="longitude" name="longitude" />
          </div>
        </Coordinates>

        <button type="submit">Salvar</button>
      </Form>

      <button type="button" onClick={handleCancelation}>
        Cancelar
      </button>
    </Container>
  );
}

EditDev.propTypes = {
  history: PropTypes.object.isRequired,
};
