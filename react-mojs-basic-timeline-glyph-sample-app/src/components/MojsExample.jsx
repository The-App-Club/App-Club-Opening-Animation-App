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

const MojsExample = ({tik, delay = 300}) => {
  const [resized, setResized] = useState(new Date());

  const animDom = useRef();

  const tl = useMemo(() => {
    // https://mojs.github.io/api/tweens/tween.html
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
  }, [resized]);

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
    return 28;
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

  const scaledCurve = (amount) => {
    return increase(scale(scaleCurve, amount), 1);
  };

  const parameters = useMemo(() => {
    return {
      top: `50%`,
      left: `50%`,
      origin: `center center`,
      fill: 'white',
      radius: charSize / 2,
      stroke: 'white',
      isForce3d: true,
    };
  }, []);

  const step1Parameters = useMemo(() => {
    return {
      ...parameters,
      shape: 'm',
      x: 0,
      y: 0,
      duration: 1000,
    };
  }, [parameters]);

  const baseLineParameters = useMemo(() => {
    return {
      origin: `center center`,
      left: '50%',
      top: '50%',
      shape: 'line',
      radius: 75,
      stroke: '#FBB454',
      strokeWidth: {5: 1},
      duration: 700,
      strokeDasharray: '100% 100%',
      easing: 'cubic.out',
    };
  }, []);

  const lineParameters = useMemo(() => {
    return {
      ...baseLineParameters,
      x: 0,
      y: 30,
      strokeDashoffset: {'100%': '-100%'},
    };
  }, [baseLineParameters]);

  const handleResize = (e) => {
    setResized(new Date());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const {top, left, bottom, right, width, height} =
      animDom.current.getBoundingClientRect();
    const step1 = new mojs.Shape({
      ...step1Parameters,
      parent: animDom.current,
      top: `0%`,
      left: `0%`,
      x: charSize / 2,
      y: charSize / 2,
      opacity: 0,
    })
      .then({
        x: {to: width / 2, easing: shiftCurve},
        scaleX: {1: 1, curve: approximate(scaledCurve(0.5))},
        opacity: 1,
      })
      .then({
        y: {to: height / 2, easing: shiftCurve},
        scaleY: {1: 1, curve: approximate(scaledCurve(0.5))},
      })
      .then({
        x: {to: width / 2 + -60},
      });

    const step2 = new mojs.Shape({
      ...step1Parameters,
      parent: animDom.current,
      top: `100%`,
      left: `0%`,
      x: charSize / 2,
      y: -charSize / 2,
      opacity: 0,
    })
      .then({
        y: {to: -height / 2, easing: shiftCurve},
        scaleY: {1: 1, curve: approximate(scaledCurve(0.5))},
        opacity: 1,
      })
      .then({
        x: {to: width / 2, easing: shiftCurve},
        scaleX: {1: 1, curve: approximate(scaledCurve(0.5))},
      })
      .then({
        x: {to: width / 2 + -20},
      });

    const step3 = new mojs.Shape({
      ...step1Parameters,
      parent: animDom.current,
      top: `100%`,
      left: `100%`,
      x: -charSize / 2,
      y: -charSize / 2,
      opacity: 0,
    })
      .then({
        x: {to: -width / 2, easing: shiftCurve},
        scaleX: {1: 1, curve: approximate(scaledCurve(0.5))},
        opacity: 1,
      })
      .then({
        y: {to: -height / 2, easing: shiftCurve},
        scaleY: {1: 1, curve: approximate(scaledCurve(0.5))},
      })
      .then({
        x: {to: -width / 2 + 20},
      });

    const step4 = new mojs.Shape({
      ...step1Parameters,
      parent: animDom.current,
      top: `0%`,
      left: `100%`,
      x: -charSize / 2,
      y: charSize / 2,
      opacity: 0,
    })
      .then({
        y: {to: height / 2 - 2, easing: shiftCurve}, // 誤差調節 マイナス2
        scaleY: {1: 1, curve: approximate(scaledCurve(0.5))},
        opacity: 1,
      })
      .then({
        x: {to: -width / 2, easing: shiftCurve},
        scaleX: {1: 1, curve: approximate(scaledCurve(0.5))},
      })
      .then({
        x: {to: -width / 2 + 60},
      });
    tl.add([step1, step2, step3, step4]);
    const line = new mojs.Shape({...lineParameters, parent: animDom.current});
    tl.append([line]);
    const burst = new mojs.Burst({
      origin: `center center`,
      top: `50%`,
      left: `50%`,
      x: 100,
      y: -30,
      parent: animDom.current,
      radius: {25: 75},
      count: 10,
      duration: 2000,
      children: {
        shape: ['circle', 'polygon'],
        fill: ['#D57E7E', '#A2CDCD', '#316B83'],
        rotate: {0: 180},
        degreeShift: 'rand(-360, 360)',
        delay: 'stagger(0, 25)',
      },
    });
    tl.append([burst]);
  }, [resized]);

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
        max-width: 40rem;
        min-height: 30rem;
        margin: 0 auto;
        width: 100%;
        border: 1px solid;
        overflow: hidden;
        background: #000;
        @media (max-width: 768px) {
          max-width: 100%;
          min-height: 80vh;
        }
      `}
    />
  );
};

export {MojsExample};
