import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import api from '../../services/api';
import history from '../../services/history';
import Header from '../../components/Header';

import { Container } from './styles';

const schema = Yup.object().shape({
  github_username: Yup.string().required('Usuário é obrigatório'),
  techs: Yup.string().required('As tecnologias são obrigatórias'),
  latitude: Yup.number()
    .typeError('Compo deve ser um valor númerico')
    .required('A latitude é obrtigatória'),
  longitude: Yup.number()
    .typeError('Compo deve ser um valor númerico')
    .required('A longitude é obrtigatória'),
});

export default function RegisterDev() {
  const [coordinates, setCordinates] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setCordinates({ latitude, longitude });
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);

  async function handleSubmit({ github_username, techs, latitude, longitude }) {
    try {
      setLoading(true);

      await api.post('/devs', {
        github_username,
        techs,
        latitude,
        longitude,
      });

      setLoading(false);
      toast.success('Dev cadastrado com sucesso!');
      history.push('/');
    } catch (error) {
      console.log(error);
      toast.error('Erro ao cadastrar dev, verifique os dados!');
      setLoading(false);
    }
  }

  return (
    <>
      <Header />

      <Container>
        <strong>Cadastrar Dev</strong>

        <Form onSubmit={handleSubmit} initialData={coordinates} schema={schema}>
          <label htmlFor="github_username">Usuário do GitHub</label>
          <Input
            type="text"
            id="github_username"
            name="github_username"
            placeholder="Digite o usuário do GitHub"
          />

          <label htmlFor="techs">
            Tecnologias (separe as teconolgias por vírgula)
          </label>
          <Input
            type="text"
            id="techs"
            name="techs"
            placeholder="Tecnologias que domina"
          />

          <div>
            <div>
              <label htmlFor="latitude">Latitude</label>
              <Input type="number" step="any" id="latitude" name="latitude" />
            </div>

            <div>
              <label htmlFor="longitude">Longitude</label>
              <Input type="number" step="any" id="longitude" name="longitude" />
            </div>
          </div>

          <button type="submit">
            {loading ? (
              <AiOutlineLoading3Quarters size={20} color="#fff" />
            ) : (
              'Cadastrar'
            )}
          </button>
        </Form>
      </Container>
    </>
  );
}
