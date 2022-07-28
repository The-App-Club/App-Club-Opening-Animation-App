import {createRoot} from 'react-dom/client';
import {css, cx} from '@emotion/css';
import {useCallback, useMemo, useRef, useState} from 'react';
import '@fontsource/inter';
import './styles/index.scss';

import gsap, {Power3} from 'gsap';
import {useEffect} from 'react';

import {Button} from '@mui/material';
import {default as TransitiveNumber} from './components/TransitiveNumber';

const App = () => {
  const [tik, setTik] = useState(null);
  const transitiveNumberRef = useRef(null);

  const handleDo = (e) => {
    setTik(new Date());
  };
  const handleNotifier = useCallback((e) => {
    console.log(e);
    // https://greensock.com/docs/v2/Easing
    gsap.to(transitiveNumberRef.current, {
      duration: 1.2,
      left: '-100%',
      ease: Power3.easeInOut,
    });
  }, []);

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
      <TransitiveNumber
        tik={tik}
        notifier={handleNotifier}
        ref={transitiveNumberRef}
      />
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
