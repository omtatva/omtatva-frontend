"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";

interface HeroLiquidTitleProps {
  title: string;
  sectionRef: RefObject<HTMLElement | null>;
  className?: string;
  onOverlayStyle: (style: CSSProperties | null) => void;
}

const titleClassName =
  "font-display text-4xl font-bold leading-[1.1] tracking-wide sm:text-5xl md:text-7xl lg:text-8xl";

function wrapCanvasLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";

  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export default function HeroLiquidTitle({
  title,
  sectionRef,
  className = "",
  onOverlayStyle,
}: HeroLiquidTitleProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLHeadingElement>(null);
  const [maskReady, setMaskReady] = useState(false);
  const videoPosRef = useRef({ x: 0, y: 0 });
  const maskSizeRef = useRef({ w: 0, h: 0 });
  const maskUrlRef = useRef<string | null>(null);

  const applyOverlayStyle = useCallback(() => {
    const { x, y } = videoPosRef.current;
    const { w, h } = maskSizeRef.current;
    const maskUrl = maskUrlRef.current;

    if (!maskReady || !maskUrl) {
      onOverlayStyle({});
      return;
    }

    onOverlayStyle({
      WebkitMaskImage: `linear-gradient(#fff, #fff), url(${maskUrl})`,
      WebkitMaskComposite: "destination-out",
      WebkitMaskSize: `100% 100%, ${w}px ${h}px`,
      WebkitMaskPosition: `0 0, ${x}px ${y}px`,
      WebkitMaskRepeat: "no-repeat",
      maskImage: `linear-gradient(#fff, #fff), url(${maskUrl})`,
      maskComposite: "exclude",
      maskSize: `100% 100%, ${w}px ${h}px`,
      maskPosition: `0 0, ${x}px ${y}px`,
      maskRepeat: "no-repeat",
    });
  }, [maskReady, onOverlayStyle]);

  const buildMask = useCallback(() => {
    const el = measureRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const w = Math.ceil(rect.width);
    const h = Math.ceil(rect.height);
    if (w < 2 || h < 2) return;

    const style = getComputedStyle(el);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "#ffffff";
    ctx.font = `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const lines = wrapCanvasLines(ctx, title, w * 0.92);
    const fontSize = parseFloat(style.fontSize);
    const lineHeight = fontSize * 1.1;
    const blockHeight = lines.length * lineHeight;
    let yPos = (h - blockHeight) / 2 + lineHeight / 2;

    for (const ln of lines) {
      ctx.fillText(ln, w / 2, yPos);
      yPos += lineHeight;
    }

    maskUrlRef.current = canvas.toDataURL("image/png");
    setMaskReady(true);
  }, [title]);

  const updateLayout = useCallback(() => {
    const section = sectionRef.current;
    const wrap = wrapRef.current;
    if (!section || !wrap) return;

    const sectionRect = section.getBoundingClientRect();
    const wrapRect = wrap.getBoundingClientRect();

    maskSizeRef.current = {
      w: Math.ceil(wrapRect.width),
      h: Math.ceil(wrapRect.height),
    };
    videoPosRef.current = {
      x: wrapRect.left - sectionRect.left,
      y: wrapRect.top - sectionRect.top,
    };
    applyOverlayStyle();
  }, [applyOverlayStyle, sectionRef]);

  useLayoutEffect(() => {
    setMaskReady(false);
    maskUrlRef.current = null;
    onOverlayStyle({});
    buildMask();
    updateLayout();
  }, [buildMask, onOverlayStyle, updateLayout, title]);

  useEffect(() => {
    applyOverlayStyle();
  }, [applyOverlayStyle, maskReady]);

  useEffect(() => {
    return () => onOverlayStyle(null);
  }, [onOverlayStyle]);

  useEffect(() => {
    const onResize = () => {
      setMaskReady(false);
      maskUrlRef.current = null;
      onOverlayStyle({});
      buildMask();
      updateLayout();
    };

    const ro = new ResizeObserver(onResize);
    if (measureRef.current) ro.observe(measureRef.current);
    if (sectionRef.current) ro.observe(sectionRef.current);
    window.addEventListener("resize", onResize);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [buildMask, onOverlayStyle, sectionRef, updateLayout]);

  const maskPending = !maskReady;

  return (
    <div ref={wrapRef} className={`relative mx-auto w-full ${className}`}>
      <h1 ref={measureRef} className={`${titleClassName} invisible`} aria-hidden>
        {title}
      </h1>

      {maskPending && (
        <h1
          className={`${titleClassName} absolute inset-0 flex items-center justify-center text-white glow-text`}
          aria-hidden
        >
          {title}
        </h1>
      )}

      <h1 className="sr-only">{title}</h1>
    </div>
  );
}
