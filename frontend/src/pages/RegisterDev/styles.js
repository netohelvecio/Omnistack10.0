import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 30px auto;
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  width: 50%;

  strong {
    text-align: center;
    font-size: 24px;
    display: block;
    color: #333;
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      font-size: 14px;
      font-weight: bold;
      color: #666;
      margin: 8px 0;
    }

    input {
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;

      &::placeholder {
        color: #acacac;
        font-size: 16px;
      }
    }

    > div {
      display: grid;
      gap: 20px;
      grid-template-columns: 1fr 1fr;

      div {
        display: flex;
        flex-direction: column;
      }
    }

    button {
      background: #7159c1;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;
      height: 35px;
      padding: 0 25px;
      margin-top: 20px;

      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        margin-right: 10px;
      }

      &:hover {
        background: ${darken(0.05, '#7159c1')};
      }
    }
  }
`;
