import {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';

import {pointFromVector} from 'popmotion';

const {Timeline} = mojs;

const MojsExample = ({tik, delay = 300}) => {
  const animDom = useRef();

  const tl = useMemo(() => {
    // https://mojs.github.io/api/tweens/tween.html
    // タイムライン全体の開始タイミングを遅らせることができる
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

  const baseParameters = useMemo(() => {
    return {
      top: '50%',
      left: '50%',
      shape: 'polygon',
      duration: 2000,
      easing: 'cubic.out',
      isShowEnd: false,
      fill: 'none',
      stroke: 'black',
    };
  }, []);

  const triangle1Parameters = useMemo(() => {
    return {
      ...baseParameters,
      radius: {60: 65},
      rotate: -60,
      strokeWidth: {50: 5},
      delay: 0,
    };
  }, [baseParameters]);

  const triangle2Parameters = useMemo(() => {
    return {
      ...baseParameters,
      radius: {85: 125},
      rotate: -60,
      strokeWidth: {7: 0},
      delay: 100,
    };
  }, [baseParameters]);

  const triangle3Parameters = useMemo(() => {
    return {
      ...baseParameters,
      radius: {85: 95},
      rotate: -60,
      strokeWidth: {4: 0},
      delay: 100,
    };
  }, [baseParameters]);

  const baseSmallTriangleParameters = useMemo(() => {
    return {
      ...baseParameters,
      radius: 14,
      rotate: -60,
      strokeWidth: {14: 4},
      easing: 'expo.out',
    };
  }, [baseParameters]);

  const smallTrianglesParameters1 = useMemo(() => {
    const point = {x: 0, y: 0};
    const angle = -150;
    const distance = 100;
    const a = pointFromVector(point, angle, distance);

    return {
      ...baseSmallTriangleParameters,
      x: {0: a.x},
      y: {0: a.y},
    };
  }, [baseSmallTriangleParameters]);

  const smallTrianglesParameters2 = useMemo(() => {
    const point = {x: 0, y: 0};
    const angle = -30;
    const distance = 100;
    const a = pointFromVector(point, angle, distance);

    return {
      ...baseSmallTriangleParameters,
      x: {0: a.x},
      y: {0: a.y},
    };
  }, [baseSmallTriangleParameters]);

  const smallTrianglesParameters3 = useMemo(() => {
    const point = {x: 0, y: 0};
    const angle = 90;
    const distance = 100;
    const a = pointFromVector(point, angle, distance);
    return {
      ...baseSmallTriangleParameters,
      x: {0: a.x},
      y: {0: a.y},
    };
  }, [baseSmallTriangleParameters]);

  useEffect(() => {
    const triangle1 = new mojs.Shape({
      ...triangle1Parameters,
      parent: animDom.current,
    });
    const triangle2 = new mojs.Shape({
      ...triangle2Parameters,
      parent: animDom.current,
    });
    const triangle3 = new mojs.Shape({
      ...triangle3Parameters,
      parent: animDom.current,
    });
    const smallTriangle1 = new mojs.Shape({
      ...smallTrianglesParameters1,
      parent: animDom.current,
    });
    const smallTriangle2 = new mojs.Shape({
      ...smallTrianglesParameters2,
      parent: animDom.current,
    });
    const smallTriangle3 = new mojs.Shape({
      ...smallTrianglesParameters3,
      parent: animDom.current,
    });
    tl.add([
      triangle1,
      triangle2,
      triangle3,
      smallTriangle1,
      smallTriangle2,
      smallTriangle3,
    ]);
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
      `}
    />
  );
};

export {MojsExample};
