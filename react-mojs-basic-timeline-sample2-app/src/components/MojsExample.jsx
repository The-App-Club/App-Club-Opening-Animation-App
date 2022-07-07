import {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';

const {Timeline} = mojs;

const MojsExample = ({tik, delay = 300}) => {
  const animDom = useRef();

  const tl = useMemo(() => {
    // https://mojs.github.io/api/tweens/tween.html
    return new Timeline({delay});
  }, []);

  const parameters = useMemo(() => {
    return {
      left: '50%',
      top: '50%',
      origin: `center center`,
      shape: 'polygon',
      isShowEnd: false,
      duration: 800,
      radius: 60,
      x: {[-200]: 20},
    };
  }, []);

  const step1 = useMemo(() => {
    return {x: 0, y: 0, duration: 300, angle: -60};
  }, []);

  const shape1Parameters = useMemo(() => {
    return {
      ...parameters,
      y: {50: -20},
      fill: 'none',
      stroke: `black`,
      strokeWidth: {7: 2},
      rotate: {[-120]: [0]},
      delay: 0,
    };
  }, [parameters]);

  const shape2Parameters = useMemo(() => {
    return {
      ...parameters,
      y: {30: -30},
      fill: 'none',
      stroke: `black`,
      strokeWidth: {7: 2},
      rotate: {[-180]: [0]},
      delay: 75,
    };
  }, [parameters]);

  const shape3Parameters = useMemo(() => {
    return {
      ...parameters,
      y: {60: -50},
      fill: 'none',
      stroke: `black`,
      strokeWidth: {7: 2},
      rotate: {[-240]: [0]},
      delay: 150,
    };
  }, [parameters]);

  useEffect(() => {
    const shape1 = new mojs.Shape({
      ...shape1Parameters,
      parent: animDom.current,
    }).then(step1);
    const shape2 = new mojs.Shape({
      ...shape2Parameters,
      parent: animDom.current,
    }).then(step1);
    const shape3 = new mojs.Shape({
      ...shape3Parameters,
      parent: animDom.current,
    }).then(step1);
    // shape1.el.style['mix-blend-mode'] = 'screen';
    // shape2.el.style['mix-blend-mode'] = 'screen';
    // shape3.el.style['mix-blend-mode'] = 'screen';
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
        width: 100%;
        min-height: 30rem;
        border: 1px solid;
      `}
    />
  );
};

export {MojsExample};
