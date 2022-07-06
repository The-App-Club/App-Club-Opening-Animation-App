import {createRoot} from 'react-dom/client';
import {cx, css} from '@emotion/css';
import {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
  useId,
  createRef,
} from 'react';
import '@fontsource/inter';
import './styles/index.scss';
import {Button} from '@mui/material';
import {MojsExample} from './components/MojsExample';

const App = () => {
  return (
    <div
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        width: 100%;
      `}
    >
      <MojsExample />
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
