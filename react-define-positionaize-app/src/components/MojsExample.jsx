import {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';

const {Timeline} = mojs;
const {approximate} = mojs.easing;

const MojsExample = ({tik}) => {
  const animDom = useRef();

  const tl = useMemo(() => {
    // https://mojs.github.io/api/tweens/tween.html
    return new Timeline();
  }, []);

  const shiftCurve = useMemo(() => {
    return mojs.easing.bezier(0.91, 0.0, 0.11, 1.005);
  }, []);

  const size = useMemo(() => {
    return 30;
    // return 160;
  }, []);

  const parameters = useMemo(() => {
    return {
      shape: 'rect',
      radius: size,
      scaleX: {1: 1, curve: shiftCurve},
      scaleY: {1: 1, curve: shiftCurve},
      origin: `50% 50%`, // origin centeriaized using center center
      isForce3d: true,
      duration: 1200,
    };
  }, []);

  useEffect(() => {
    const shape1 = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      fill: '#62abf3',
      top: `${50}%`,
      left: `${50}%`,
    });
    const shape2 = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      fill: '#abc',
      top: `${50}%`,
      left: `${0}%`,
      x: size,
    });
    const shape3 = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      fill: '#abc',
      top: `${50}%`,
      left: `${100}%`,
      x: -size,
    });
    const shape4 = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      fill: '#62abf3',
      top: `${0}%`,
      left: `${100}%`,
      x: -size,
      y: size,
    });
    const shape5 = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      fill: '#abc',
      top: `${0}%`,
      left: `${50}%`,
      y: size,
      delay: 300,
    });
    const shape6 = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      fill: '#62abf3',
      top: `${0}%`,
      left: `${0}%`,
      x: size,
      y: size,
      delay: 300,
    });
    const shape7 = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      fill: '#62abf3',
      top: `${100}%`,
      left: `${50}%`,
      y: -size,
      delay: 600,
    });
    const shape8 = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      fill: '#abc',
      top: `${100}%`,
      left: `${0}%`,
      x: size,
      y: -size,
      delay: 600,
    });
    const shape9 = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      fill: '#abc',
      top: `${100}%`,
      left: `${100}%`,
      x: -size,
      y: -size,
      delay: 600,
    });
    tl.add([shape1, shape2, shape3, shape4])
      .add([shape5, shape6])
      .add([shape7, shape8, shape9]);
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
        width: 100%;
        max-width: 40rem;
        min-height: 30rem;
        border: 1px solid;
      `}
    />
  );
};

export {MojsExample};
