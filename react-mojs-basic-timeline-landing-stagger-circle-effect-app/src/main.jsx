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
  const [tik, setTik] = useState(null);

  const handleDo = (e) => {
    setTik(new Date());
  };

  return (
    <>
      <div
        className={css`
          position: fixed;
          top: 1rem;
          left: 1rem;
          z-index: 1;
        `}
      >
        <Button variant={'outlined'} onClick={handleDo}>
          Do
        </Button>
      </div>
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100%;
        `}
      >
        <MojsExample tik={tik} />
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
