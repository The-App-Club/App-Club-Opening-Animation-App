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
        console.log(`onStart`);
      },
      onProgress(p, isForward, isYoyo) {
        console.log(`onProgress`, p);
      },
      onComplete(isForward, isYoyo) {
        console.log('onComplete');
      },
    });
  }, []);

  const circleSize = useMemo(() => {
    return 500;
  }, []);

  const scaleCircleSize = useMemo(() => {
    return (
      1.4 * (Math.max(window.innerWidth, window.innerHeight) / circleSize / 2)
    );
  }, [circleSize]);

  const parameters = useMemo(() => {
    return {
      origin: `center center`,
      left: '50%',
      top: '50%',
      radius: circleSize,
      easing: 'cubic.out',
      isShowEnd: false,
      isForce3d: true,
    };
  }, [circleSize]);

  const lineParameters = useMemo(() => {
    return {
      origin: `center center`,
      left: '50%',
      top: '50%',
      shape: 'line',
      radius: 50,
      radiusY: 0,
      stroke: '#abc',
      strokeWidth: {15: 0},
      duration: 1000,
      isShowEnd: false,
      strokeDasharray: '100% 100%',
      easing: 'cubic.out',
    };
  }, []);

  const line1Parameters = useMemo(() => {
    return {
      ...lineParameters,
      x: -180,
      strokeDashoffset: {'-100%': '100%'},
    };
  }, [lineParameters]);

  const line2Parameters = useMemo(() => {
    return {
      ...lineParameters,
      x: 180,
      strokeDashoffset: {'100%': '-100%'},
    };
  }, [lineParameters]);

  const triangleParameters = useMemo(() => {
    return {
      origin: `center center`,
      left: '50%',
      top: '50%',
      shape: 'polygon',
      radius: 40,
      duration: 700,
      fill: 'black',
      scale: {1: 0},
      delay: 850,
      easing: 'cubic.out',
    };
  }, []);

  const triangle1Parameters = useMemo(() => {
    return {
      ...triangleParameters,
      y: {[80]: 0},
      rotate: 0,
    };
  }, []);

  const triangle2Parameters = useMemo(() => {
    return {
      ...triangleParameters,
      y: {[-80]: 0},
      rotate: 180,
    };
  }, []);

  useEffect(() => {
    const circle1 = new mojs.Shape({
      ...parameters,
      fill: '#eee',
      scale: {0.05: 0.2},
      duration: 800,
      delay: 0,
      isShowEnd: false,
      parent: animDom.current,
    })
      .then({
        easing: 'cubic.inout',
        scale: 0.125,
        duration: 600,
      })
      .then({
        easing: 'cubic.inout',
        scale: scaleCircleSize,
        duration: 800,
      });

    const circle2 = new mojs.Shape({
      ...parameters,
      fill: '#ccc',
      scale: {0: 0.1125},
      duration: 700,
      delay: 1000,
      isShowEnd: false,
      parent: animDom.current,
    }).then({
      easing: 'cubic.inout',
      scale: scaleCircleSize,
      duration: 700,
    });

    const circle3 = new mojs.Shape({
      ...parameters,
      fill: '#bbb',
      scale: {0: scaleCircleSize},
      duration: 1000,
      delay: 2000,
      isShowStart: true,
      isShowEnd: false,
      parent: animDom.current,
    });

    const smallCircle = new mojs.Shape({
      left: '50%',
      top: '50%',
      radius: {5: 25},
      fill: 'none',
      stroke: '#aaa',
      strokeWidth: {20: 0},
      isShowEnd: false,
      delay: 1200,
      duration: 500,
      parent: animDom.current,
    });

    tl.add([circle1, circle2, circle3, smallCircle]);

    const line1 = new mojs.Shape({...line1Parameters, parent: animDom.current});
    const line2 = new mojs.Shape({...line2Parameters, parent: animDom.current});

    tl.add([line1, line2]);

    const triangle1 = new mojs.Shape({
      ...triangle1Parameters,
      parent: animDom.current,
    });
    const triangle2 = new mojs.Shape({
      ...triangle2Parameters,
      parent: animDom.current,
    });

    tl.add([triangle1, triangle2]);
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
        border: 1px solid;
        max-width: 30rem;
        min-height: 30rem;
        width: 100%;
        overflow: hidden;

        @media (max-width: 768px) {
          max-width: 100%;
          min-height: 100vh;
        }
      `}
    />
  );
};

export {MojsExample};
