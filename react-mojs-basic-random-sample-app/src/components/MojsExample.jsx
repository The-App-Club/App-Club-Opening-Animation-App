import {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';

const {Timeline, Burst} = mojs;

const MojsExample = ({tik}) => {
  const animDom = useRef();
  useEffect(() => {
    animDom.current = new Burst({
      top: 0,
      left: 0,
      radius: {'rand(4, 40)': 'rand(50, 100)'},
      count: 5,
      children: {
        radius: 'rand(2, 20)',
        duration: 1000,
      },
    });
    return () => {};
  }, []);

  const handleDo = (e) => {
    const burst = animDom.current;
    burst.tune({x: e.pageX, y: e.pageY}).generate().replay();
  };

  useEffect(() => {
    document.addEventListener('click', handleDo);
    return () => {
      document.removeEventListener('click', handleDo);
    };
  }, []);

  return null;
};

export {MojsExample};
