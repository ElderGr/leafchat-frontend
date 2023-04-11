import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body{
    font-family: Roboto;
    padding: 0px;
    margin: 0px;
    height: 100vh;
    background: #f9f9f9;

    #root{
      height: 100%;
      width: 100%;
    }
  }
`;
