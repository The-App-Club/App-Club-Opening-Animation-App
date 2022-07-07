import {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import mojs from '@mojs/core';
import {cx, css} from '@emotion/css';

const {Timeline} = mojs;

const _MojsExample2 = ({tik, delay = 300, notifier}, ref) => {
  const tl = useMemo(() => {
    // https://mojs.github.io/api/tweens/tween.html
    return new Timeline({
      delay,
      onStart(isForward, isYoyo) {
        ref.current.style.zIndex = 1;
        // console.log(`onStart`);
      },
      onProgress(p, isForward, isYoyo) {
        // console.log(`onProgress`, p);
      },
      onComplete(isForward, isYoyo) {
        // console.log('onComplete');
        ref.current.style.zIndex = -1;
        notifier({status: 1});
      },
    });
  }, []);

  const parameters = useMemo(() => {
    return {
      top: '50%',
      left: '50%',
      origin: `center center`,
      shape: 'polygon',
      duration: 1200,
      radius: {150: 100},
      fill: 'none',
      strokeWidth: 3,
    };
  }, []);

  const shape1Parameters = useMemo(() => {
    // https://developer.mozilla.org/ja/docs/Web/SVG/Attribute/stroke-dasharray
    return {
      ...parameters,
      stroke: 'orange',
      scale: {[0]: [1]},
      rotate: {[0]: [30]},
      delay: 0,
    };
  }, [parameters]);

  const shape2Parameters = useMemo(() => {
    return {
      ...parameters,
      stroke: 'pink',
      scale: {[0]: [1]},
      rotate: {[0]: [45]},
      delay: 600,
    };
  }, [parameters]);

  const shape3Parameters = useMemo(() => {
    return {
      ...parameters,
      stroke: 'black',
      scale: {[0]: [1]},
      rotate: {[0]: [60]},
      delay: 1400,
    };
  }, [parameters]);

  useEffect(() => {
    const shape1 = new mojs.Shape({
      ...shape1Parameters,
      parent: ref.current,
    }).then({
      delay: 1000,
      isShowEnd: false,
    });
    const shape2 = new mojs.Shape({
      ...shape2Parameters,
      parent: ref.current,
    });
    const shape3 = new mojs.Shape({
      ...shape3Parameters,
      parent: ref.current,
    });
    tl.add([shape1, shape2, shape3]);
  }, []);

  useEffect(() => {
    if (!tik) {
      return;
    }
    tl.play();
  }, [tik]);

  return (
    <div
      ref={ref}
      className={css`
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
      `}
    />
  );
};

const MojsExample2 = forwardRef(_MojsExample2);

export {MojsExample2};
