import {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';

const {Timeline, Burst} = mojs;

const Shapes = mojs.stagger(mojs.Shape);

const MojsExample = ({tik}) => {
  const animDom = useRef();

  const tl = useMemo(() => {
    // https://mojs.github.io/api/tweens/tween.html
    return new Timeline();
  }, [tik]);

  const parameters = useMemo(() => {
    return {};
  }, [tik]);

  useEffect(() => {
    const shapes = new Shapes({
      quantifier: 5,
      radius: 33,
      x: 'stagger(-150,50)',
      y: 'stagger(-150,50)',
      delay: [0, 100, 200, 300, 400],
      scale: {0: 1},
      fill: [{'#6E85B7': '#B2C8DF'}, {'#90C8AC': '#73A9AD'}],
      duration: 1000,
      easing: 'cubic.out',
      isShowEnd: false,
      parent: animDom.current,
    });
    tl.add([shapes]);

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
