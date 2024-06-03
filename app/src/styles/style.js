



import { createGlobalStyle } from 'styled-components';
const colors = {
    primary: '#450E0D', // Azul
    secondary: '#450E0D', // Cinza
    success: '#28a745', // Verde
    danger: '#dc3545', // Vermelho
  warning: '#ffc107', // Amarelo
    info: '#17a2b8', // Azul claro
    light: '#f8f9fa', // Cinza claro
    dark: '#343a40' // Preto
};
export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    display: flex;
    flex-direction: column;
    min-height: 100%;
    width: 100%;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }


  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  button {
    font-weight: 600;
  }

  p {
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
  }

  .subtitle1 {
    font-size: 1rem;
    font-weight: 500;
    line-height: 1.75;
  }

  .subtitle2 {
    font-size: 0.875rem;
    font-weight: 500;
    line-height: 1.57;
  }

  .overline {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    line-height: 2.5;
    text-transform: uppercase;
  }

  .caption {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1.66;
  }

  h1 {
    font-weight: 700;
    font-size: 3.5rem;
    line-height: 1.375;
  }

  h2 {
    font-weight: 700;
    font-size: 3rem;
    line-height: 1.375;
  }

  h3 {
    font-weight: 700;
    font-size: 2.25rem;
    line-height: 1.375;
  }

  h4 {
    font-weight: 700;
    font-size: 2rem;
    line-height: 1.375;
  }

  h5 {
    font-weight: 600;
    font-size: 1.5rem;
    line-height: 1.375;
  }

  h6 {
    font-weight: 600;
    font-size: 1.125rem;
    line-height: 1.375;
  }

  button {
    font-weight: 600;
    color: ${colors.light};
    background-color: ${colors.primary}; 
    padding: 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: darken(${colors.primary}, 10%); 
  }
  
  
  
`;
