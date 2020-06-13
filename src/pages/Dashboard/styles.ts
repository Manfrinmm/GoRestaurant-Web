import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 40px 0;
  margin-top: -140px;
`;

export const FoodsContainer = styled.div`
  margin: 0 auto;
  padding: 0 16px;
  width: 100%;

  @media (max-width: 352px) {
    padding: 0 8px;
  }

  @media (max-width: 336px) {
    padding: 0;
  }

  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 32px;
`;
