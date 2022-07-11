import {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import * as d3 from 'd3';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';
import {samples} from 'culori';
import {transform} from 'framer-motion';

console.log(d3.schemeRdYlBu[10]);

const {Timeline} = mojs;

const Shapes = mojs.stagger(mojs.Shape);

const MojsExample = ({tik, delay = 300}) => {
  const animDom = useRef();

  const tl = useMemo(() => {
    // https://mojs.github.io/api/tweens/tween.html
    return new Timeline({
      delay,
      onStart(isForward, isYoyo) {},
      onProgress(p, isForward, isYoyo) {},
      onComplete(isForward, isYoyo) {},
    });
  }, []);

  const pairColors = useMemo(() => {
    // return d3.pairs(d3.schemePaired).map(([from, to]) => {
    //   return {[from]: to};
    // });
    // return d3.pairs(d3.schemeRdYlBu[10]).map(([from, to]) => {
    //   return {[from]: to};
    // });
    return d3.pairs(d3.schemeTableau10).map(([from, to]) => {
      return {[from]: to};
    });
  }, []);

  const circleCount = useMemo(() => {
    return 6;
  }, []);

  const delays = useMemo(() => {
    return [...Array(circleCount).keys()].map((n) => {
      return n * 100;
    });
  }, [circleCount]);

  const pairScales = useMemo(() => {
    return samples(circleCount)
      .map((t) => {
        return transform([0, 1], [0.2, 0.8])(t);
      })
      .map((t) => {
        return {0: t * 1};
      })
      .reverse();
  }, [circleCount]);

  const circleSize = useMemo(() => {
    return 400;
  }, []);

  const scaleCircleSize = useMemo(() => {
    return (
      1.4 * (Math.max(window.innerWidth, window.innerHeight) / circleSize / 2)
    );
  }, [circleSize]);

  const parameters = useMemo(() => {
    return {
      origin: `center center`,
      left: '50%',
      top: '50%',
      radius: circleSize,
      easing: 'cubic.out',
      isShowEnd: false,
    };
  }, [circleSize]);

  useEffect(() => {
    const shapes = new Shapes({
      ...parameters,
      quantifier: circleCount,
      delay: delays,
      scale: pairScales,
      fill: pairColors,
      duration: 1000,
      easing: 'cubic.out',
      parent: animDom.current,
    }).then({
      easing: 'cubic.inout',
      scale: scaleCircleSize,
      duration: 700,
    });
    tl.add([shapes]);
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
        max-width: 100%;
        min-height: 100vh;
        width: 100%;
        overflow: hidden;
      `}
    />
  );
};

export {MojsExample};
