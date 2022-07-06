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
      onStart: (isFwd) => {
        console.log(`onStart`, isFwd);
      },
      onComplete: (isFwd) => {
        console.log(`onComplete`, !isFwd);
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
