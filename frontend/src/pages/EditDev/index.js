import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import redirect from '../../services/history';
import api from '../../services/api';

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
  const [file, setFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const { techs, name, bio, avatar_url, _id } = history.location.state;

        setAvatarPreview(avatar_url);
        setInitialData({
          latitude,
          longitude,
          techs,
          name,
          bio,
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
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      formData.append('bio', bio);
      formData.append('techs', techs);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);

      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };

      await api.put(`/devs/${initalData._id}`, formData, config);

      redirect.push('/');
      toast.success('Dev atualizado!');
    } catch (error) {
      console.log(error);
      toast.error('Error ao atualizar dev, verfique os dados');
    }
  }

  function handleChange(e) {
    const reader = new FileReader();
    const avatar = e.target.files[0];

    reader.onloadend = () => {
      setFile(avatar);
      setAvatarPreview(reader.result);
    };

    reader.readAsDataURL(avatar);
  }

  return (
    <Container>
      <strong>Editar Dev</strong>

      <AvatarContainer>
        <AvatarInput>
          <label htmlFor="avatar">
            <img
              src={
                avatarPreview || 'https://api.adorable.io/avatars/140/kappa.png'
              }
              alt=""
            />

            <input
              id="avatar"
              type="file"
              name="file"
              accept="image/*"
              onChange={e => handleChange(e)}
            />
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
