import { createGlobalStyle } from "styled-components";
import { normalize } from "polished";

const GlobalStyles = createGlobalStyle`
    ${normalize()}
    *,
    *::after,
    *::before{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body {
        transition: all 0.05s linear;
        width: 100%;
        height: 100vh;
        line-height: 2.1rem;
        font-family: ${({ theme }) => theme.primaryFont};
        font-style: normal;
        font-weight: 400;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    h1 {
        font-size: ${({ theme }) => theme.typeScale.header1}
    }

    h2 {
        font-size: ${({ theme }) => theme.typeScale.header2}
    }

    h3 {
        font-size: ${({ theme }) => theme.typeScale.header3}
    }

    h4 {
        font-size: ${({ theme }) => theme.typeScale.header4}
    }

    h5 {
        font-size: ${({ theme }) => theme.typeScale.header5}
    }

    .page-fade-enter {
        opacity: 0;
    }
      
    .page-fade-enter.page-fade-enter-active {
        opacity: 1;
        transition: all 0.3s;
    }
      
    .page-fade-exit {
        opacity: 1;
    }
      
    .page-fade-exit.page-fade-exit-active {
        opacity: 0;
        transition: all 0.3s;
    }
`;

export default GlobalStyles;
