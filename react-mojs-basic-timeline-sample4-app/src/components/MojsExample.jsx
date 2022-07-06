import {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';

const {Timeline} = mojs;

class Sparks extends mojs.CustomShape {
  getShape() {
    return '<path d="M11.8274713,76.9078071 C11.8274713,76.9078071 2.16693973,42.95046 30.0687526,21.2517012"></path><path d="M25.7538383,77.4836394 C25.7538383,77.4836394 20.7413252,19.6928312 92.8457655,18.1298659"></path><path d="M29.8949928,85.1781099 C29.8949928,85.1781099 41.4904038,48.3985179 81.1308462,59.416066"></path>';
  }
}
mojs.addShape('sparks', Sparks);

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
      shape: 'rect',
      stroke: 'black',
      strokeWidth: 40,
      angle: {'-240': 0},
      radius: 20,
      scale: {0: 2},
      rotate: {360: -360},
      duration: 1500,
      fill: 'none',
      easing: 'expo.out',
      isShowEnd: false,
    };
  }, []);

  const sparkParameters = useMemo(() => {
    return {
      shape: 'sparks',
      radius: 15,
      fill: 'none',
      strokeWidth: {10: 0},
      stroke: 'black',
      strokeDasharray: '75',
      strokeDashoffset: {75: '-75'},
      duration: 1200,
      // easing: 'cubic.out',
      strokeLinecap: 'round',
    };
  }, []);

  const spark1Parameters = useMemo(() => {
    return {
      ...sparkParameters,
      top: '25%',
      left: '125%',
      angle: 80,
    };
  }, [sparkParameters]);

  const spark2Parameters = useMemo(() => {
    return {
      ...sparkParameters,
      top: '125%',
      left: '80%',
      angle: 165,
    };
  }, [sparkParameters]);

  const spark3Parameters = useMemo(() => {
    return {
      ...sparkParameters,
      top: '75%',
      left: '-25%',
      angle: 250,
    };
  }, [sparkParameters]);

  const spark4Parameters = useMemo(() => {
    return {
      ...sparkParameters,
      top: '-25%',
      left: '20%',
      angle: 330,
    };
  }, [sparkParameters]);

  useEffect(() => {
    const shape1 = new mojs.Shape({...parameters, parent: animDom.current});
    const spark1 = new mojs.Shape({
      ...spark1Parameters,
      parent: shape1.el,
    });
    const spark2 = new mojs.Shape({
      ...spark2Parameters,
      parent: shape1.el,
    });
    const spark3 = new mojs.Shape({
      ...spark3Parameters,
      parent: shape1.el,
    });
    const spark4 = new mojs.Shape({
      ...spark4Parameters,
      parent: shape1.el,
    });
    tl.add([shape1, spark1, spark2, spark3, spark4]);
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
