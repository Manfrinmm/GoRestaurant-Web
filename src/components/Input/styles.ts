import styled, { css } from 'styled-components';

interface IContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  align-items: center;

  background: #fff;
  border-radius: 8px;
  padding: 18px 24px;
  width: 100%;
  font-size: 16px;

  border: 1px solid ${props => (props.isFocused ? '#ff9000' : '#fff')};

  & + div {
    margin-top: 24px;
  }

  h1 {
    margin-bottom: 40px;
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
  }

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #b7b7cc;

    ${props =>
      (props.isFilled || props.isFocused) &&
      css`
        color: #ff9000;
      `}

    &::placeholder {
      color: #b7b7cc;
    }
  }

  svg {
    margin-right: 16px;
  }
`;
