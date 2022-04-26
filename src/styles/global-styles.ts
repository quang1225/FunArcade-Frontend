import { createGlobalStyle } from 'styled-components';
import { TRANSITION_TIME } from 'utils/constants';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    color: white;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }

  * {
    font-family: 'Montserrat', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
  }

  #root { height: 100vh; white-space: pre-line }

  :root {
    --global--background-color: #0F2743;
    --global--background-color-2: #102a51;
    --global--background-color-3: #1659b4;
    --global--background-color-4: #1c3964;
    --global--button-color: #1659D4;
    --global--body-color: #03c2fe;
    --global--body-color-2: #8fffde;
    --global--text-color: #3978ec;
    --global--text-color-2: #58708c;
  }

  ::placeholder {
    color: var(--global--text-color-2);
    opacity: 1;
  }

  * {
    outline: none;
  }

  ::-webkit-scrollbar {
    width: 4px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: none;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background: var(--global--background-color-3);
    border-radius: 4px;
  }

  .MuiContainer-root {
    height: 100%;
  }

  .MuiMenuItem-root {
    border-radius: 8px !important;

    &:hover {
      background-color: var(--global--background-color-4) !important;
    }
  }

  .full_height_page {
    height: 100%;
    flex-direction: column;
    display: flex;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
      scrollbar-width: none;
    }
  }

  .yellow_text {
    color: #ffe37e;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  .global_transition, svg path, a, button, .MuiTab-root {
    transition: ${TRANSITION_TIME}s !important;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  .common-hover-link {
    cursor: pointer;
    &:hover {
      color: var(--global--button-color);

      svg path[fill] {
        fill: var(--global--button-color);
      }

      svg path[stroke] {
        stroke: var(--global--button-color);
      }
    }
  }

  .MuiSelect-select:focus {
    background-color: unset !important;
  }

  label {
    display: block;
    margin-bottom: 8px;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  .no-padding {
    padding: 0;
  }

  canvas {
    width: 100%;
  }

  .showOnMobile, .showOnMobile-flex {
    display: none !important;
  }

  .icon_next_to_text {
    margin: 0 5px;
  }

  pre {
    background-color: var(--global--background-color-2);
    padding: 12px;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    ::-webkit-scrollbar {
      width: 0;
    }
    .hideOnMobile {
      display: none !important;
    }
    .showOnMobile {
      display: block !important;
    }
    .showOnMobile-flex {
      display: flex !important;
    }
    canvas {
      border-radius: 8px;
    }
  }
`;
