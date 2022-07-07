import {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';

const {Timeline} = mojs;

const MojsExample = ({tik, delay = 300}) => {
  const animDom = useRef();

  const tl = useMemo(() => {
    // https://mojs.github.io/api/tweens/tween.html
    return new Timeline({
      delay,
      onStart(isForward, isYoyo) {
        // console.log(`onStart`);
      },
      onProgress(p, isForward, isYoyo) {
        // console.log(`onProgress`, p);
      },
      onComplete(isForward, isYoyo) {
        // console.log('onComplete');
      },
    });
  }, []);

  const parameters = useMemo(() => {
    return {
      top: '50%',
      left: '50%',
      origin: `center center`,
      shape: 'polygon',
      duration: 1200,
      radius: {150: 100},
      fill: 'none',
      strokeWidth: 3,
    };
  }, []);

  const shape1Parameters = useMemo(() => {
    // https://developer.mozilla.org/ja/docs/Web/SVG/Attribute/stroke-dasharray
    return {
      ...parameters,
      stroke: 'red',
      strokeDasharray: {'50% 100%': '0% 100%'},
      strokeDashoffset: {'50%': '-66%'},
      rotate: {[0]: [60]},
      delay: 0,
    };
  }, [parameters]);

  const shape2Parameters = useMemo(() => {
    return {
      ...parameters,
      stroke: 'blue',
      strokeDasharray: {'30% 120%': '0% 100%'},
      strokeDashoffset: {'42%': '-76%'},
      rotate: {[0]: [120]},
      delay: 600,
    };
  }, [parameters]);

  const shape3Parameters = useMemo(() => {
    return {
      ...parameters,
      stroke: 'green',
      strokeDasharray: {'30% 120%': '0% 100%'},
      strokeDashoffset: {'42%': '-86%'},
      rotate: {[0]: [180]},
      delay: 1400,
    };
  }, [parameters]);

  useEffect(() => {
    const shape1 = new mojs.Shape({
      ...shape1Parameters,
      parent: animDom.current,
    });
    const shape2 = new mojs.Shape({
      ...shape2Parameters,
      parent: animDom.current,
    });
    const shape3 = new mojs.Shape({
      ...shape3Parameters,
      parent: animDom.current,
    });
    tl.add([shape1, shape2, shape3]);
  }, []);

  useEffect(() => {
    if (!tik) {
      return;
    }
    tl.play();
  }, [tik]);

  return (
    <div
      ref={animDom}
      className={css`
        position: relative;
        max-width: 40rem;
        min-height: 30rem;
        margin: 0 auto;
        width: 100%;
        border: 1px solid;
        overflow: hidden;
        @media (max-width: 768px) {
          max-width: 100%;
          min-height: 80vh;
        }
      `}
    />
  );
};

export {MojsExample};
