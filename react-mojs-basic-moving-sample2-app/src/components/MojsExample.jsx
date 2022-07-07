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
    const triangle1 = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      easing: 'cubic.out',
      shape: 'polygon',
      points: 3,
      top: `50%`,
      left: `50%`,
      fill: 'none',
      stroke: 'black',
      strokeWidth: 2,
      radius: size,
      x: 100,
      y: -100,
      isShowEnd: true,
    });
    const triangle2 = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      easing: 'cubic.out',
      shape: 'polygon',
      points: 3,
      top: `50%`,
      left: `50%`,
      fill: 'none',
      stroke: 'black',
      strokeWidth: 2,
      radius: size,
      x: -100,
      y: -100,
      isShowEnd: true,
    });
    const triangle3 = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      easing: 'cubic.out',
      shape: 'polygon',
      points: 3,
      top: `50%`,
      left: `50%`,
      fill: 'none',
      stroke: 'black',
      strokeWidth: 2,
      radius: size,
      x: -100,
      y: 100,
      isShowEnd: true,
    });
    const triangle4 = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      easing: 'cubic.out',
      shape: 'polygon',
      points: 3,
      top: `50%`,
      left: `50%`,
      fill: 'none',
      stroke: 'black',
      strokeWidth: 2,
      radius: size,
      x: -100,
      y: -100,
      isShowEnd: true,
    });

    const triangle = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      easing: 'cubic.out',
      shape: 'polygon',
      points: 3,
      top: `50%`,
      left: `50%`,
      fill: 'none',
      stroke: 'black',
      strokeWidth: 2,
      radius: size,
      x: 100,
      y: -100,
      isShowEnd: true,
    });

    tl.append(triangle1).add([triangle]);

    triangle.then({
      x: {to: -100},
    });

    tl.add([triangle]).append(triangle2);

    triangle.then({
      y: {to: 100},
    });

    tl.add([triangle]).append(triangle3);

    triangle.then({
      x: {to: 100},
    });
    tl.add([triangle]).append(triangle4);

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
