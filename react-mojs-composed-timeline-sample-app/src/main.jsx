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
import {MojsExample2} from './components/MojsExample2';

import gsap from 'gsap';

const App = () => {
  const openingDomRef = useRef(null);
  const step1DomRef = useRef(null);
  const step2DomRef = useRef(null);
  const mainDomRef = useRef(null);

  const [doStep1, setDoStep1] = useState(null);
  const [doStep2, setDoStep2] = useState(null);

  const tl = useMemo(() => {
    return gsap.timeline({paused: true});
  }, []);

  const notifier1 = useCallback((e) => {
    setDoStep2(new Date());
  }, []);

  const notifier2 = useCallback((e) => {
    document.body.classList.remove('loading');
    tl.to(openingDomRef.current, {
      y: `-100%`,
      duration: 1.2,
    }).to(mainDomRef.current, {
      opacity: 1,
      duration: 0.7,
    });
    tl.play();
  }, []);

  const handleDo = (e) => {
    setDoStep1(new Date());
  };

  useEffect(() => {
    setDoStep1(new Date());
  }, []);

  return (
    <>
      {/* <Button
        variant={'outlined'}
        onClick={handleDo}
        className={css`
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1;
        `}
      >
        Do
      </Button> */}
      <div
        ref={openingDomRef}
        className={css`
          position: fixed;
          max-width: 100%;
          width: 100%;
          height: 100%;
          min-height: 100vh;
        `}
      >
        <div
          className={css`
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          `}
        >
          <MojsExample ref={step1DomRef} tik={doStep1} notifier={notifier1} />
        </div>
        <div
          className={css`
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          `}
        >
          <MojsExample2 ref={step2DomRef} tik={doStep2} notifier={notifier2} />
        </div>
      </div>

      <main
        ref={mainDomRef}
        className={css`
          position: relative;
          width: 100%;
          height: 100%;
          opacity: 0;
        `}
      >
        <article
          className={css`
            width: 100%;
            height: 100%;
          `}
        >
          <section
            className={css`
              position: relative;
              width: 100%;
              min-height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 4rem;
              background: orange;
            `}
          >
            1
          </section>
          <section
            className={css`
              position: relative;
              width: 100%;
              min-height: 100vh;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 4rem;
              background: skyblue;
            `}
          >
            2
          </section>
        </article>
      </main>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
