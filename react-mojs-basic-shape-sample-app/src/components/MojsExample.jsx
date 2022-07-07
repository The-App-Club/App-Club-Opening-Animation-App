import {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';
import * as d3 from 'd3';
import {transform} from 'framer-motion';
import {samples} from 'culori';
import gsap from 'gsap';

const {Timeline, Burst} = mojs;

const MojsExample = ({tik}) => {
  const animDom = useRef();

  const tl = useMemo(() => {
    // https://mojs.github.io/api/tweens/tween.html
    return new Timeline();
  }, [tik]);

  const parameters = useMemo(() => {
    // https://mojs.github.io/api/modules/shape/
    return {
      origin: `center center`,
      duration: 1000,
      isShowStart: false,
      isShowEnd: false,
      onStart(isForward, isYoyo) {
        console.log(`onStart`);
      },
      onProgress(p, isForward, isYoyo) {
        console.log(`onProgress`, p);
      },
      onComplete(isForward, isYoyo) {
        console.log('onComplete');
      },
    };
  }, [tik]);

  const size = useMemo(() => {
    return 30;
  }, []);

  useEffect(() => {
    const circle = new mojs.Shape({
      ...parameters,
      shape: 'circle',
      parent: animDom.current,
      top: 0,
      left: 0,
      radius: size,
      fill: {[`#ABC9FF`]: [`#FFDEDE`]},
      scale: {0: 1},
      x: size,
      y: size,
    });

    const rect = new mojs.Shape({
      ...parameters,
      duration: 2000,
      parent: animDom.current,
      shape: 'rect',
      top: `100%`,
      left: 0,
      x: size * 2,
      y: -size * 2,
      radius: size,
      fill: `none`,
      stroke: {[`#ABC9FF`]: [`#FFDEDE`]},
      strokeWidth: {[10]: [0]},
      strokeDasharray: '100%',
      strokeDashoffset: {'-100%': '100%'},
      rotate: {[0]: [180]},
    });

    const polygon = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      shape: `polygon`,
      points: 5,
      top: 0,
      left: `100%`,
      x: -size,
      y: size,
      radius: size,
      fill: {[`#ABC9FF`]: [`#FFDEDE`]},
    });

    const zigzag = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      shape: 'zigzag',
      points: 11,
      radiusX: size * 1,
      radiusY: size * 1,
      top: `100%`,
      left: `100%`,
      fill: `none`,
      x: -size * 1,
      y: -size * 1,
      stroke: {[`#ABC9FF`]: [`#FFDEDE`]},
      strokeDasharray: '100%',
      strokeDashoffset: {'-100%': '100%'},
    });

    const curve = new mojs.Shape({
      ...parameters,
      duration: 3000,
      parent: animDom.current,
      shape: 'curve',
      points: 11,
      radiusX: size * 4,
      radiusY: size * 4,
      top: `100%`,
      left: `50%`,
      fill: 'none',
      y: -size * 1,
      strokeWidth: 10,
      stroke: {[`#ABC9FF`]: [`#FFDEDE`]},
      strokeDasharray: '100%',
      strokeDashoffset: {'-100%': '100%'},
    });

    const triangle = new mojs.Shape({
      ...parameters,
      isShowEnd: true,
      parent: animDom.current,
      shape: `polygon`,
      points: 3,
      top: `50%`,
      left: `0%`,
      x: size * 1,
      radius: {[size]: [size]},
      rotate: {[-60]: [120]},
      fill: 'none',
      stroke: 'black',
      strokeWidth: {7: 0},
      easing: 'cubic.out',
    });

    const cross = new mojs.Shape({
      ...parameters,
      duration: 3000,
      parent: animDom.current,
      shape: 'cross',
      points: 11,
      radiusX: size * 1,
      radiusY: size * 1,
      top: `50%`,
      left: `50%`,
      fill: 'none',
      strokeWidth: 10,
      stroke: {[`#ABC9FF`]: [`#FFDEDE`]},
      strokeDasharray: '100%',
      strokeDashoffset: {'-100%': '100%'},
    });

    tl.add([circle, rect, polygon, zigzag, curve, cross, triangle]);

    return () => {};
  }, [tik]);

  useEffect(() => {
    if (!tik) {
      return;
    }
    tl.play();
    return () => {};
  }, [tik]);

  return (
    <div
      ref={animDom}
      className={css`
        position: relative;
        border: 1px solid;
        max-width: 30rem;
        min-height: 30rem;
        width: 100%;
        overflow: hidden;
      `}
    />
  );
};

export {MojsExample};
