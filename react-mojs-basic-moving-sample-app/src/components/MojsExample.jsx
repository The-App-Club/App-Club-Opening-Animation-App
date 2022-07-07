import {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';
import {pointFromVector} from 'popmotion';

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
        // console.log(`onStart`);
      },
      onProgress(p, isForward, isYoyo) {
        // console.log(`onProgress`, p);
      },
      onComplete(isForward, isYoyo) {
        // console.log('onComplete');
      },
    };
  }, [tik]);

  const size = useMemo(() => {
    return 30;
  }, []);

  useEffect(() => {
    const point = {x: 0, y: -100};
    const angle = 60;
    const distance = 250;
    const a = pointFromVector(point, angle, distance);
    const b = pointFromVector(point, angle * 2, distance);

    // x: {[-100] : 100} ok
    // x: {[-100] : [100]} ng
    const triangle = new mojs.Shape({
      ...parameters,
      shape: 'polygon',
      points: 3,
      top: `50%`,
      left: `50%`,
      fill: 'none',
      stroke: 'black',
      strokeWidth: 2,
      rotate: {[0]: [360]},
      easing: 'cubic.out',
      radius: size,
      y: -100,
      parent: animDom.current,
    })
      .then({
        x: {to: a.x},
        y: {to: a.y},
      })
      .then({
        rotate: {[0]: [360]},
      })
      .then({
        x: {to: b.x},
        y: {to: b.y},
      })
      .then({
        rotate: {[0]: [360]},
      })
      .then({
        x: {to: point.x},
        y: {to: point.y},
      })
      .then({
        rotate: {[0]: [360]},
      });

    const triangle2 = new mojs.Shape({
      ...parameters,
      shape: 'polygon',
      points: 3,
      top: `50%`,
      left: `50%`,
      fill: 'none',
      stroke: 'black',
      strokeWidth: 2,
      rotate: {[0]: [360]},
      scale: {[0]: [1]},
      easing: 'cubic.out',
      radius: size * 4,
      parent: animDom.current,
    });
    tl.add([triangle]).append(triangle2);

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
