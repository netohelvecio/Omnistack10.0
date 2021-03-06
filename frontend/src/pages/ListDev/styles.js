import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  margin: 0 auto;
  width: 60%;

  ul {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
    margin-top: 30px;
  }
`;

export const Dev = styled.li`
  padding: 20px;
  border-radius: 8px;
  background: #fff;

  header {
    display: flex;
    justify-content: start;
    align-items: center;

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
    }

    div {
      display: flex;
      flex-direction: column;

      strong {
        font-size: 18px;
        color: #333;
      }

      span {
        font-size: 14px;
        color: #999;
      }
    }
  }

  p {
    font-size: 16px;
    color: #666;
    line-height: 20px;
    margin: 8px 0;
  }
`;

export const Options = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    color: #7159c1;
    margin-top: 10px;

    &:hover {
      opacity: 0.9;
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    button {
      border: 0;
      background: #fff;

      & + button {
        margin-left: 15px;
      }
    }
  }
`;

export const ContainerLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 60px 0;

  span {
    margin-left: 10px;
    color: #fff;
    font-weight: bold;
    font-size: 20px;
  }

  svg {
    margin: 0px;
    padding: 0px;
    animation: ${rotate} 1s linear infinite;
  }
`;
