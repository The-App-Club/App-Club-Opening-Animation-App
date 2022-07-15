import {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';

const {Timeline} = mojs;

const MojsExample = ({tik, delay = 300}) => {
  const animDom = useRef();

  const tl = useMemo(() => {
    // https://mojs.github.io/api/tweens/tween.html
    return new Timeline({delay});
  }, []);

  const parameters = useMemo(() => {
    return {
      origin: `50% 50%`,
      top: `50%`,
      left: `50%`,
      fill: `none`,
      radius: 24,
      isShowEnd: true,
      isForce3d: true,
    };
  }, []);

  const elasticCurve = useMemo(() => {
    return mojs.easing.path(
      'M0,0 L42.4468,99.9990418 C46.3646102,-8.62551409 51.8137449,77.8031065 53.2538649,98.8047514 C54.3071019,114.164379 57.4212363,145.777285 62.4147182,98.8047479 C62.4147182,98.8047504 64.981755,73.166208 70.2635684,98.8047479 C73.8553743,114.6133 81.1660962,98.8047504 100,99.9990418'
    );
  }, []);

  const bounceCurve = useMemo(() => {
    return mojs.easing.path(
      'M0,-100 C0,-100 15.6877613,115.487686 32.0269814,74.203186 C62.0118605,-1.559962 100.057489,-0.0941416292 100.057489,-0.0941416292'
    );
  }, []);

  const fontSize = useMemo(() => {
    return 48;
  }, []);

  const nBounceCurve = useMemo(() => {
    return (p) => {
      return 2 - bounceCurve(p);
    };
  }, []);

  useEffect(() => {
    const offsetX = -10;

    const char1 = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      y: {0: -130},
      x: 0 - fontSize + offsetX,
      rotate: {0: -80},
      scaleX: {1: 1, curve: bounceCurve},
      scaleY: {1: 1, curve: nBounceCurve},
      easing: 'quad.out',
      duration: 350,
    }).then({
      y: {[-130]: 0},
      rotate: {to: 80, curve: elasticCurve},
      easing: 'bounce.out',
      duration: 850,
    });
    const char2 = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      y: {0: -130},
      x: 0 + offsetX,
      rotate: {0: -80},
      scaleX: {1: 1, curve: bounceCurve},
      scaleY: {1: 1, curve: nBounceCurve},
      easing: 'quad.out',
      duration: 350,
      delay: 300,
    }).then({
      y: {[-130]: 0},
      rotate: {to: 80, curve: elasticCurve},
      easing: 'bounce.out',
      duration: 850,
    });
    const char3 = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      y: {0: -130},
      x: fontSize + offsetX,
      rotate: {0: -80},
      scaleX: {1: 1, curve: bounceCurve},
      scaleY: {1: 1, curve: nBounceCurve},
      easing: 'quad.out',
      duration: 350,
      delay: 500,
    }).then({
      y: {[-130]: 0},
      rotate: {to: 80, curve: elasticCurve},
      easing: 'bounce.out',
      duration: 850,
    });
    const char4 = new mojs.Shape({
      ...parameters,
      parent: animDom.current,
      y: {0: -130},
      x: fontSize * 2 + offsetX,
      rotate: {0: -80},
      scaleX: {1: 1, curve: bounceCurve},
      scaleY: {1: 1, curve: nBounceCurve},
      easing: 'quad.out',
      duration: 350,
      delay: 700,
    }).then({
      y: {[-130]: 0},
      rotate: {to: 80, curve: elasticCurve},
      easing: 'bounce.out',
      duration: 850,
    });
    const charDom1 = document.createElement('div');
    const charDom2 = document.createElement('div');
    const charDom3 = document.createElement('div');
    const charDom4 = document.createElement('div');
    charDom1.classList.add('character');
    charDom2.classList.add('character');
    charDom3.classList.add('character');
    charDom4.classList.add('character');
    char1.el.appendChild(charDom1);
    char2.el.appendChild(charDom2);
    char3.el.appendChild(charDom3);
    char4.el.appendChild(charDom4);
    charDom1.innerHTML = 'T';
    charDom2.innerHTML = 'A';
    charDom3.innerHTML = 'N';
    charDom4.innerHTML = 'T';
    tl.add([char1, char2, char3, char4]);
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
        max-width: 40rem;
        width: 100%;
        min-height: 30rem;
        /* border: 1px solid; */
        .character {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          font-size: ${fontSize}px;
          display: flex;
          justify-content: center;
          align-items: center;
          /* border: 1px solid; */
        }
      `}
    />
  );
};

export {MojsExample};
