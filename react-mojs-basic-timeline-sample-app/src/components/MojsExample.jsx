import {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';

const {Timeline} = mojs;

const MojsExample = ({tik, delay = 300}) => {
  const animDom = useRef();

  const tl = useMemo(() => {
    return new Timeline({delay});
  }, []);

  const parameters = useMemo(() => {
    return {
      left: '50%',
      top: '50%',
      shape: 'polygon',
      duration: 1200,
      radius: {150: 100},
      fill: 'none',
      strokeWidth: 3,
    };
  }, []);

  const shape1Parameters = useMemo(() => {
    return Object.assign({
      ...parameters,
      stroke: 'red',
      strokeDasharray: {'50% 100%': '0% 100%'},
      strokeDashoffset: {'50%': '-66%'},
      angle: {'-70': '-60'},
      delay: 0,
    });
  }, [parameters]);

  const shape2Parameters = useMemo(() => {
    return Object.assign({
      ...parameters,
      stroke: 'blue',
      strokeDasharray: {'30% 120%': '0% 120%'},
      strokeDashoffset: {'42%': '-76%'},
      angle: {'-80': '-60'},
      delay: 600,
    });
  }, [parameters]);

  const shape3Parameters = useMemo(() => {
    return Object.assign({
      ...parameters,
      stroke: 'green',
      strokeDasharray: {'30% 120%': '0% 120%'},
      strokeDashoffset: {'42%': '-86%'},
      angle: {'-90': '-60'},
      delay: 1400,
    });
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

  return <div ref={animDom} className={css``} />;
};

export {MojsExample};
