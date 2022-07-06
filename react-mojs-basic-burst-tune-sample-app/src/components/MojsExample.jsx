import {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';
import * as d3 from 'd3';
import {transform} from 'framer-motion';
import {samples} from 'culori';
import gsap from 'gsap';

const {Timeline, Burst} = mojs;

const MojsExample = ({tik}) => {
  const animDom = useRef();

  useEffect(() => {
    const burst = new mojs.Burst({
      left: 0,
      top: 0,
      radius: {4: 19},
      angle: 45,
      children: {
        shape: 'line',
        radius: 3,
        scale: 1,
        stroke: '#FD7932',
        strokeDasharray: '100%',
        strokeDashoffset: {'-100%': '100%'},
        duration: 700,
        easing: 'quad.out',
      },
    });

    const handleDo = (e) => {
      // burst.tune({x: e.pageX, y: e.pageY}).replay();
      burst
        .tune({x: window.innerWidth / 2, y: window.innerHeight / 2})
        .replay();
    };

    document.addEventListener('click', handleDo);
    return () => {
      document.removeEventListener('click', handleDo);
    };
  }, [tik]);

  return null;
};

export {MojsExample};
