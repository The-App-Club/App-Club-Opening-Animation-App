import {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';

const {Timeline} = mojs;
const {approximate} = mojs.easing;

class M extends mojs.CustomShape {
  getShape() {
    return '<path d="M91.5714286,44.4285714 L91.5714286,100 L96.7142857,100 L96.7142857,33.4285714 L49.8571429,72 L3,33.4285714 L3,100 L8.14285714,100 L8.14285714,44.4285714 L49.8571429,78.7142857 L91.5714286,44.4285714 Z M49.8571429,38.7142857 L92,3.85714286 L88.7142857,-6.50146603e-13 L49.8571429,31.8571429 L11,-6.50146603e-13 L7.71428571,3.85714286 L49.8571429,38.7142857 Z"></path>';
  }
}
mojs.addShape('m', M);

class J extends mojs.CustomShape {
  getShape() {
    return '<path d="M22,87.535014 C27.7422969,95.0980392 36.8459384,100 47.070028,100 C64.2969188,100 78.442577,88.6554622 78.442577,68.627451 L78.442577,0 L73.4005602,0 L73.4005602,68.627451 C73.4005602,85.8543417 61.4957983,94.9579832 47.070028,94.9579832 C38.3865546,94.9579832 30.5434174,90.6162465 25.7815126,84.0336134 L22,87.535014 Z"></path>';
  }
}
mojs.addShape('j', J);

class S extends mojs.CustomShape {
  getShape() {
    return '<path d="M15,71.0164835 C15,92.3076923 34.7802198,100 49.478022,100 C68.5714286,100 84.0934066,91.2087912 84.0934066,72.3901099 C84.0934066,61.5384615 79.2857143,51.7857143 61.978022,45.1923077 C45.2197802,38.8736264 27.2252747,35.5769231 27.2252747,21.8406593 C27.2252747,10.3021978 38.0769231,4.53296703 48.9285714,4.53296703 C59.9175824,4.53296703 70.7692308,10.3021978 70.7692308,21.8406593 L75.7142857,21.8406593 C75.7142857,7.14285714 62.6648352,0 49.478022,0 C36.0164835,0 22.2802198,7.41758242 22.2802198,21.8406593 C22.2802198,39.5604396 43.4340659,42.9945055 60.6043956,49.5879121 C74.8901099,55.0824176 79.1483516,63.7362637 79.1483516,72.5274725 C79.1483516,89.010989 64.1758242,95.0549451 49.478022,95.0549451 C35.3296703,95.0549451 19.9450549,87.6373626 19.9450549,71.0164835 L15,71.0164835 Z"></path>';
  }
}
mojs.addShape('s', S);

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

  const shiftCurve = useMemo(() => {
    return approximate(
      mojs.easing.path('M0,100 C50,100 50,100 50,50 C50,0 50,0 100,0')
    );
  }, []);

  const scaleCurve = useMemo(() => {
    return approximate(
      mojs.easing.path(
        'M0,100 C21.3776817,95.8051376 50,77.3262711 50,-700 C50,80.1708527 76.6222458,93.9449005 100,100'
      )
    );
  });

  const charSize = useMemo(() => {
    return 25;
  }, []);

  const leftStep = useMemo(() => {
    return 22;
  }, []);

  const CHAR_HIDE_THEN = useMemo(() => {
    return {
      delay: 1600,
      isShowEnd: false,
    };
  }, []);

  const scale = (curve, n) => {
    return (p) => {
      return n * curve(p);
    };
  };

  const increase = (curve, n) => {
    return (p) => {
      return n + curve(p);
    };
  };

  const scaleC = approximate(increase(scaleCurve, 1));

  const scaledCurve = (amount) => {
    return increase(scale(scaleCurve, amount), 1);
  };

  const scaleCShort = approximate(scaledCurve(0.75));

  const parameters = useMemo(() => {
    return {
      fill: 'black',
      radius: charSize / 2,
      stroke: 'black',
      isForce3d: true,
    };
  }, []);

  const step1Parameters = useMemo(() => {
    return {
      ...parameters,
      shape: 'm',
      left: `${1 * leftStep}%`,
      x: -100,
      y: {[350]: 150, easing: shiftCurve},
      scaleY: {1: 1, curve: scaleCShort},
      origin: {'50% 100%': '50% 0%', easing: shiftCurve},
      delay: 400,
      duration: 1000,
    };
  }, [parameters]);

  const step2Parameters = useMemo(() => {
    return {
      ...parameters,
      shape: 'circle',
      fill: 'none',
      left: `${2 * leftStep}%`,
      strokeWidth: 3,
      x: 200,
      y: {[-100]: 250, easing: shiftCurve},
      scaleY: {1: 1, curve: scaleC},
      origin: {'50% 0%': '50% 100%', easing: shiftCurve},
      delay: 600,
      duration: 800,
    };
  }, [parameters]);

  const step3Parameters = useMemo(() => {
    return {
      ...parameters,
      shape: 'j',
      left: `${3 * leftStep}%`,
      x: -200,
      y: {[250]: -100, easing: shiftCurve},
      scaleY: {1: 1, curve: scaleC},
      origin: {'50% 100%': '50% 0%', easing: shiftCurve},
      delay: 40,
      duration: 1000,
    };
  }, [parameters]);

  const step4Parameters = useMemo(() => {
    return {
      ...parameters,
      shape: 's',
      left: `${4 * leftStep}%`,
      x: {500: 0, easing: shiftCurve},
      y: 200,
      scaleX: {1: 1, curve: scaleC},
      origin: {'100% 50%': '0% 100%', easing: shiftCurve},
      delay: 200,
      duration: 900,
    };
  }, [parameters]);

  useEffect(() => {
    const step1 = new mojs.Shape({
      ...step1Parameters,
      parent: animDom.current,
    }).then({
      y: {to: 0, easing: shiftCurve},
      scaleY: {1: 1, curve: approximate(scaledCurve(0.5))},
      origin: {'50% 100%': '50% 0%', easing: shiftCurve},
      delay: 200,
    });
    // .then(CHAR_HIDE_THEN);

    const step2 = new mojs.Shape({...step2Parameters, parent: animDom.current})
      .then({
        duration: 700,
        x: {to: 0, easing: shiftCurve},
        scaleX: {1: 1, curve: scaleCShort},
        origin: {'100% 50%': '0% 50%', easing: shiftCurve},
      })
      .then({
        duration: 1200,
        y: {to: 0, easing: shiftCurve},
        scaleY: {1: 1, curve: scaleCShort},
        origin: {'50% 100%': '50% 0%', easing: shiftCurve},
      });
    // .then(CHAR_HIDE_THEN);

    const step3 = new mojs.Shape({...step3Parameters, parent: animDom.current})
      .then({
        duration: 900,
        x: {to: 0, easing: shiftCurve},
        scaleX: {1: 1, curve: scaleCShort},
        origin: {'0% 50%': '100% 50%', easing: shiftCurve},
      })
      .then({
        y: {to: 0, easing: shiftCurve},
        scaleY: {1: 1, curve: approximate(scaledCurve(0.5))},
        origin: {'50% 0%': '50% 100%', easing: shiftCurve},
      });
    // .then(CHAR_HIDE_THEN);

    const step4 = new mojs.Shape({
      ...step4Parameters,
      parent: animDom.current,
    }).then({
      delay: 200,
      y: {to: 0, easing: shiftCurve},
      scaleY: {1: 1, curve: scaleCShort},
      origin: {'50% 100%': '50% 0%', easing: shiftCurve},
    });
    // .then({...CHAR_HIDE_THEN, delay: 2200});

    tl.add([step1, step2, step3, step4]);
    // tl.add([step1, step2]);
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
        max-width: 20rem;
        margin: 0 auto;
        width: 100%;
        min-height: 3rem;
      `}
    />
  );
};

export {MojsExample};
