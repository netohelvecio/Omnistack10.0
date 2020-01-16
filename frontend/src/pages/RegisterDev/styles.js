import styled, { keyframes } from 'styled-components';
import { darken } from 'polished';

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

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

    span {
      margin-top: 3px;
      color: #f80d46;
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

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
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
        margin: 0px;
        padding: 0px;
        animation: ${rotate} 1s linear infinite;
      }

      &:hover {
        background: ${darken(0.05, '#7159c1')};
      }
    }
  }
`;
