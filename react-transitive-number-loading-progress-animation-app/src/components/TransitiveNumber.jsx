import {css, cx} from '@emotion/css';
import {
  forwardRef,
  useEffect,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import gsap from 'gsap';

const _TransitiveNumber = ({tik, notifier}, ref) => {
  const n1 = useRef(null);
  const n2 = useRef(null);
  const n3 = useRef(null);
  const f1 = useRef(null);
  const f2 = useRef(null);
  const f3 = useRef(null);

  const tl = useMemo(() => {
    return gsap.timeline({
      paused: true,
      onStart: function () {
        console.log(`start`);
      },
      onComplete: function () {
        console.log(`complete`);
        gsap
          .timeline()
          .to([n1.current, n2.current, n3.current], {
            opacity: 0,
          })
          .to([f1.current, f2.current, f3.current], {
            opacity: 1,
            y: 0,
            stagger: 0.3,
            onComplete: function () {
              // notifier
              notifier(`done`);
            },
          });
      },
    });
  }, [tik]);

  useEffect(() => {
    if (!tik) {
      return;
    }
    gsap.set([n1.current, n2.current, n3.current], {
      opacity: 1,
      y: 0,
    });
    gsap.set([f1.current, f2.current, f3.current], {
      opacity: 0,
      y: 90,
    });
    tl.to(
      n1.current,
      {
        y: -782 - 90,
      },
      `start`
    )
      .to(
        n2.current,
        {
          y: -782,
        },
        `start-=0.4`
      )
      .to(
        n3.current,
        {
          y: -782,
        },
        `start-=0.2`
      );
    tl.seek(0).pause();
    setTimeout(() => {
      tl.duration(3.5).play();
    }, 400);
  }, [tik]);

  return (
    <div
      ref={ref}
      className={css`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        min-height: 100vh;
        background: wheat;
        position: relative;
      `}
    >
      <div
        className={css`
          max-width: 160px;
          width: 100%;
          min-height: 72px;
          overflow: hidden;
          /* border: 1px solid; */
          font-size: 72px;
          position: relative;
        `}
      >
        <div
          ref={n1}
          className={css`
            position: absolute;
            top: -8px;
            left: 14px;
            width: 14px; // must width
          `}
        >
          {`01234567890`.split('').map((n, i) => {
            return (
              <span
                key={i}
                className={css`
                  display: inline-flex;
                  justify-content: center;
                  align-items: center;
                  width: 1rem;
                `}
              >
                {n}
              </span>
            );
          })}
        </div>
        <div
          ref={f1}
          className={css`
            position: absolute;
            top: -8px;
            left: 14px;
            width: 14px; // must width
            opacity: 0;
          `}
        >
          <span
            className={css`
              display: inline-flex;
              justify-content: center;
              align-items: center;
              width: 1rem;
            `}
          >
            {1}
          </span>
        </div>
        <div
          ref={n2}
          className={css`
            position: absolute;
            top: -8px;
            left: 72px;
            width: 14px; // must width
          `}
        >
          {`0123456789`.split('').map((n, i) => {
            return (
              <span
                key={i}
                className={css`
                  display: inline-flex;
                  justify-content: center;
                  align-items: center;
                  width: 1rem;
                `}
              >
                {n}
              </span>
            );
          })}
        </div>
        <div
          ref={f2}
          className={css`
            position: absolute;
            top: -8px;
            left: 72px;
            width: 14px; // must width
            opacity: 0;
          `}
        >
          <span
            className={css`
              display: inline-flex;
              justify-content: center;
              align-items: center;
              width: 1rem;
            `}
          >
            {0}
          </span>
        </div>
        <div
          ref={n3}
          className={css`
            position: absolute;
            top: -8px;
            left: 128px;
            width: 14px; // must width
          `}
        >
          {`0123456789`.split('').map((n, i) => {
            return (
              <span
                key={i}
                className={css`
                  display: inline-flex;
                  justify-content: center;
                  align-items: center;
                  width: 1rem;
                `}
              >
                {n}
              </span>
            );
          })}
        </div>
        <div
          ref={f3}
          className={css`
            position: absolute;
            top: -8px;
            left: 128px;
            width: 14px; // must width
            opacity: 0;
          `}
        >
          <span
            className={css`
              display: inline-flex;
              justify-content: center;
              align-items: center;
              width: 1rem;
            `}
          >
            {0}
          </span>
        </div>
      </div>
    </div>
  );
};

const TransitiveNumber = forwardRef(_TransitiveNumber);

export default memo(TransitiveNumber);
