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

  const tl = useMemo(() => {
    // https://mojs.github.io/api/tweens/tween.html
    return new Timeline();
  }, [tik]);

  const parameters = useMemo(() => {
    return {
      radius: {25: 185},
      count: 11,
      rotate: {0: 180},
      onStart(isForward, isYoyo) {
        console.log(`onStart`);
      },
      onProgress(p, isForward, isYoyo) {
        console.log(`onProgress`, p);
      },
      onComplete(isForward, isYoyo) {
        console.log('onComplete');
      },
      children: {
        // property map - maps over children with mod function
        shape: 'polygon',
        points: [3, 5],
        rotate: {[-360]: [360]},
        // property map - maps over children with mod function
        fill: samples(3).map((t) => {
          return d3.interpolateGreens(transform([0, 1], [0.2, 0.8])(t));
        }),
        radius: {0: 140},
        // rand string - generates random value for every child rand( min, max )
        degreeShift: 'rand(-360, 360)',
        duration: 1200,
        // stagger string( start, step ) for every child
        delay: 'stagger(0, rand(0, 200))',
      },
    };
  }, [tik]);

  useEffect(() => {
    const burst = new Burst({...parameters, parent: animDom.current});
    tl.add([burst]);

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
