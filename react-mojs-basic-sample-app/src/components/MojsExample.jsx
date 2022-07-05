import {useRef, useEffect, useState, useCallback} from 'react';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';
const MojsExample = ({tik}) => {
  const animDom = useRef();
  const bouncyCircle = useRef();

  useEffect(() => {
    bouncyCircle.current = new mojs.Shape({
      parent: animDom.current,
      shape: 'circle',
      fill: {'#FC46AD': '#F64040'},
      radius: {50: 200},
      duration: 1500,
      isShowStart: true,
      easing: 'elastic.inout',
      onStart() {
        console.log(`onStart`);
      },
      onComplete() {
        console.log(`onComplete`);
      },
    });
  }, []);

  useEffect(() => {
    if (!tik) {
      return;
    }
    bouncyCircle.current.play();
  }, [tik]);

  return <div ref={animDom} className={css``} />;
};

export {MojsExample};
