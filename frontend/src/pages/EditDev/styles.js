import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  margin: 15px auto;
  background: #fff;
  padding: 30px;
  border-radius: 8px;
  width: 50%;

  strong {
    text-align: center;
    font-size: 24px;
    display: block;
    color: #333;
    margin-bottom: 8px;
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

    textarea {
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 8px;
      font-size: 14px;
      resize: none;

      &::placeholder {
        color: #acacac;
        font-size: 16px;
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

  button {
    background: #f64c75;
    font-weight: bold;
    width: 100%;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: background 0.2s;
    height: 35px;
    margin-top: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background: ${darken(0.05, '#f64c75')};
    }
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const AvatarInput = styled.div`
  margin: 0 auto;
  display: block;
  margin-bottom: 10px;

  label {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }

    img {
      height: 120px;
      width: 120px;
      border-radius: 50%;
      border: 3px solid rgba(255, 255, 255, 0.3);
      background: #eee;
    }

    input {
      display: none;
    }
  }
`;

export const Coordinates = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;

  div {
    display: flex;
    flex-direction: column;
  }
`;
