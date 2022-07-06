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
      isShowEnd: false,
      duration: 800,
      radius: 65,
      x: {'-200': 20},
    };
  }, []);

  const step1 = useMemo(() => {
    return {x: 0, y: 0, duration: 300, angle: -60, scaleX: 1};
  }, []);

  const shape1Parameters = useMemo(() => {
    return Object.assign({
      ...parameters,
      y: {50: -20},
      fill: 'red',
      angle: {'-120': '-40'},
      scaleX: {0: 1.3},
      delay: 0,
    });
  }, [parameters]);

  const shape2Parameters = useMemo(() => {
    return Object.assign({
      ...parameters,
      y: {30: -30},
      fill: 'blue',
      angle: {'-180': '-20'},
      scaleX: {0: 1.46},
      delay: 75,
    });
  }, [parameters]);

  const shape3Parameters = useMemo(() => {
    return Object.assign({
      ...parameters,
      y: {60: '-50'},
      fill: 'green',
      angle: {'-220': '-10'},
      scaleX: {0: 1.3},
      delay: 150,
    });
  }, [parameters]);

  useEffect(() => {
    const shape1 = new mojs.Shape(shape1Parameters).then(step1);
    const shape2 = new mojs.Shape(shape2Parameters).then(step1);
    const shape3 = new mojs.Shape(shape3Parameters).then(step1);
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

  return <div ref={animDom} className={css``} />;
};

export {MojsExample};
