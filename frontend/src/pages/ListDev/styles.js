import styled from 'styled-components';

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
    margin: 10px 0;
  }

  a {
    color: #7159c1;
    margin-top: 20px;

    &:hover {
      opacity: 0.9;
    }
  }
`;
