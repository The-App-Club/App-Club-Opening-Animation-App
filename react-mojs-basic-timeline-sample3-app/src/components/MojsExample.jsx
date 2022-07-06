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

  const parameters = useMemo(() => {
    return {
      left: '50%',
      top: '50%',
      shape: 'polygon',
      duration: 2000,
      radius: {60: 65},
      angle: -60,
      fill: 'none',
      stroke: 'black',
      strokeWidth: {30: 5},
      easing: 'cubic.out',
      isShowEnd: false,
    };
  }, []);

  const triangleParameters = useMemo(() => {
    return {
      left: '50%',
      top: '50%',
      shape: 'polygon',
      duration: 2000,
      radius: {85: 125},
      angle: -60,
      fill: 'none',
      stroke: 'black',
      strokeWidth: {7: 0},
      easing: 'cubic.out',
      delay: 100,
      isShowEnd: false,
    };
  }, []);

  const triangleParameters1 = useMemo(() => {
    return {
      ...triangleParameters,
      strokeWidth: {4: 0},
      radius: {85: 95},
      duration: 1400,
    };
  }, [triangleParameters]);

  const smallTrianglesParameters = useMemo(() => {
    return {
      left: '50%',
      top: '50%',
      shape: 'polygon',
      duration: 2000,
      radius: 14,
      angle: -60,
      fill: 'none',
      stroke: 'black',
      strokeWidth: {14: 4},
      easing: 'expo.out',
      isShowEnd: false,
    };
  }, []);

  // xy position build on polygon trgiangle vertex positionaize
  const smallTrianglesParameters1 = useMemo(() => {
    return {
      ...smallTrianglesParameters,
      x: {0: -87},
      y: {0: -50},
    };
  }, [smallTrianglesParameters]);

  const smallTrianglesParameters2 = useMemo(() => {
    return {
      ...smallTrianglesParameters,
      x: {0: 87},
      y: {0: -50},
    };
  }, [smallTrianglesParameters]);

  const smallTrianglesParameters3 = useMemo(() => {
    return {
      ...smallTrianglesParameters,
      x: 0,
      y: {0: 1.15 * 87},
    };
  }, [smallTrianglesParameters]);

  useEffect(() => {
    const shape1 = new mojs.Shape({...parameters, parent: animDom.current});
    const triangle = new mojs.Shape({
      ...triangleParameters,
      parent: animDom.current,
    });
    const triangle1 = new mojs.Shape({
      ...triangleParameters1,
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
      shape1,
      triangle,
      triangle1,
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

  return <div ref={animDom} className={css``} />;
};

export {MojsExample};
