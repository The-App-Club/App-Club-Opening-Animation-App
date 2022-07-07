import {useRef, useEffect, useState, useCallback, useMemo} from 'react';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';
import * as d3 from 'd3';
import {transform} from 'framer-motion';
import {samples} from 'culori';
import gsap from 'gsap';

const {Timeline, Burst} = mojs;

const {approximate} = mojs.easing;

const MojsExample = ({tik}) => {
  const animDom = useRef();

  const tl = useMemo(() => {
    // https://mojs.github.io/api/tweens/tween.html
    return new Timeline();
  }, [tik]);

  const parameters = useMemo(() => {
    return {};
  }, [tik]);

  const shiftCurve = useMemo(() => {
    return approximate(
      mojs.easing.path('M0,100 C50,100 50,100 50,50 C50,0 50,0 100,0')
    );
  }, []);

  const scaleCurveBase = useMemo(() => {
    return mojs.easing.path(
      'M0,100 C21.3776817,95.8051376 50,77.3262711 50,-700 C50,80.1708527 76.6222458,93.9449005 100,100'
    );
  }, []);

  const scaleCurve = useMemo(() => {
    return approximate((p) => {
      return 1 + scaleCurveBase(p);
    });
  }, []);

  const nScaleCurve = useMemo(() => {
    return approximate((p) => {
      return 1 - scaleCurveBase(p) / 10;
    });
  }, []);

  useEffect(() => {
    const shape = new mojs.Shape({
      shape: 'rect',
      fill: {'#F64040': '#F64040', curve: scaleCurve},
      radius: 50,
      x: {[-125]: 125, easing: shiftCurve},
      scaleX: {1: 1, curve: scaleCurve},
      scaleY: {1: 1, curve: nScaleCurve},
      origin: {'0 50%': '100% 50%', easing: shiftCurve}, // left center >>> bottom center
      duration: 800,
      isForce3d: true,
      isShowEnd: false,
    });

    tl.add([shape]);

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
