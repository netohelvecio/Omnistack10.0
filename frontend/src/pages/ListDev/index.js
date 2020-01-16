import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { toast } from 'react-toastify';

import history from '../../services/history';
import api from '../../services/api';
import Header from '../../components/Header';

import { Container, Dev, Options, ContainerLoading } from './styles';

export default function ListDev() {
  const [devs, setDevs] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadDevs() {
    try {
      setLoading(true);

      const response = await api.get('/devs');
      setDevs(response.data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Error ao listar devs!');
    }
  }

  useEffect(() => {
    loadDevs();
  }, []);

  function handleEdit(dev) {
    history.push(`/edit`, dev);
  }

  async function handleDelete(_id) {
    const result = window.confirm('Deseja deletar dev?');
    if (result) {
      try {
        await api.delete(`devs/${_id}`);
        loadDevs();
        toast.success('Dev deletado!');
      } catch (error) {
        console.log(error);
        toast.error('Error ao deletar dev!');
      }
    }
  }

  return (
    <>
      <Header />

      <Container>
        {loading ? (
          <ContainerLoading>
            <AiOutlineLoading3Quarters color="#fff" size={40} />
            <span>Carregando...</span>
          </ContainerLoading>
        ) : (
          <ul>
            {devs.map(dev => (
              <Dev key={dev._id}>
                <header>
                  <img src={dev.avatar_url} alt={dev.name} />

                  <div>
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                  </div>
                </header>

                <p>{dev.bio}</p>

                <Options>
                  <a href={`https://github.com/${dev.github_username}`}>
                    Acessar perfil GitHub
                  </a>

                  <div>
                    <button type="button">
                      <MdDelete
                        color="#f64c75"
                        size={25}
                        onClick={() => handleDelete(dev._id)}
                      />
                    </button>
                    <button type="button">
                      <MdEdit
                        color="#36c95f"
                        size={25}
                        onClick={() => handleEdit(dev)}
                      />
                    </button>
                  </div>
                </Options>
              </Dev>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
