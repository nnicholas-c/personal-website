"use client";

// The two worlds as inks in one liquid. A single full-frame fragment pass:
// domain-warped fbm flow fields marble the mix between the two images and
// never repeat; analytic vortices let the cursor stir the liquid; a bias
// uniform (driven by the chooser's spring) gathers one ink until it dominates
// — and floods the frame on commit. Stateless (no ping-pong sim), so it can't
// blow up, resumes instantly, and runs at any DPR.

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

const VERT = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `
precision highp float;
varying vec2 v_uv;
uniform vec2 u_res;
uniform float u_time;
uniform float u_bias;        // 0..1 — share of the frame the FIRST ink owns
uniform float u_horizontal;  // 1 = worlds meet left/right, 0 = stacked
uniform float u_still;       // 1 = reduced motion: freeze the sea
uniform sampler2D u_texA;
uniform sampler2D u_texB;
uniform vec2 u_sizeA;
uniform vec2 u_sizeB;
uniform vec2 u_focusA;
uniform vec2 u_focusB;
uniform vec4 u_imp[8];       // xy: pos (uv), z: age (s), w: strength (signed)

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = rot * p * 2.03;
    a *= 0.5;
  }
  return v;
}

// object-fit: cover for an arbitrary texture
vec2 coverUV(vec2 uv, vec2 texSize, vec2 focus) {
  float frameAspect = u_res.x / u_res.y;
  float texAspect = texSize.x / texSize.y;
  vec2 scale = vec2(1.0);
  if (frameAspect > texAspect) {
    scale.y = texAspect / frameAspect;   // crop vertically
  } else {
    scale.x = frameAspect / texAspect;   // crop horizontally
  }
  return (uv - 0.5) * scale + focus;
}

void main() {
  vec2 uv = v_uv;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y) * 2.6;
  float t = u_time * (1.0 - u_still) * 0.045;

  // the cursor stirs the liquid: decaying analytic vortices displace the field
  vec2 stir = vec2(0.0);
  for (int i = 0; i < 8; i++) {
    vec4 imp = u_imp[i];
    if (imp.w == 0.0) continue;
    vec2 d = vec2((uv.x - imp.x) * aspect, uv.y - imp.y);
    float r2 = dot(d, d);
    float fall = exp(-r2 * 26.0) * exp(-imp.z * 1.1);
    stir += vec2(-d.y, d.x) * imp.w * fall;
  }
  p += stir * 2.2;

  // ink in water: two rounds of domain warping, drifting forever
  vec2 q = vec2(fbm(p + t * vec2(0.9, 0.35)),
                fbm(p + vec2(5.2, 1.3) - t * vec2(0.45, 0.75)));
  vec2 r = vec2(fbm(p + 2.4 * q + vec2(1.7, 9.2) + t * 0.35),
                fbm(p + 2.4 * q + vec2(8.3, 2.8) - t * 0.28));
  float field = fbm(p + 2.1 * r);

  // where the inks meet: a bias-positioned interface, heavily warped by the
  // field so it forms tendrils, islands and eddies rather than a line
  float axis = mix(uv.y, uv.x, u_horizontal);
  float lead = mix(-0.22, 1.22, u_bias);
  float m = smoothstep(-0.5, 0.5, (axis - lead) * 3.4 + (field - 0.5) * 2.6);

  vec3 colA = texture2D(u_texA, coverUV(uv, u_sizeA, u_focusA)).rgb;
  vec3 colB = texture2D(u_texB, coverUV(uv, u_sizeB, u_focusB)).rgb;
  vec3 col = mix(colA, colB, m);

  // mist blooms where the inks interpenetrate; second warp tints it
  float meet = m * (1.0 - m) * 4.0;
  vec3 mist = mix(vec3(0.72, 0.78, 0.88), vec3(0.86, 0.82, 0.78), r.x);
  col += mist * meet * 0.14;
  // gentle depth: darken slightly where the field folds
  col *= 1.0 - 0.10 * meet * (0.5 + 0.5 * q.y);

  gl_FragColor = vec4(col, 1.0);
}`;

export type FluidHandles = {
  canvas: HTMLCanvasElement | null;
};

export default function FluidCanvas({
  imgA,
  imgB,
  focusA,
  focusB,
  bias,
  horizontal,
  reduce,
}: {
  imgA: string;
  imgB: string;
  /** cover focus as fractions, e.g. {x:0.5, y:0.55} */
  focusA: { x: number; y: number };
  focusB: { x: number; y: number };
  /** 0..100 — share of the frame ink A owns (the chooser's seam spring) */
  bias: MotionValue<number>;
  /** matchMedia ref: worlds meet left/right (md+) vs stacked */
  horizontal: React.MutableRefObject<boolean>;
  reduce: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl =
      canvas.getContext("webgl", { antialias: false, alpha: false }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return; // CSS fallback (plain split) stays visible underneath
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        // eslint-disable-next-line no-console
        console.error("FluidCanvas shader:", gl.getShaderInfoLog(s));
      }
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      // eslint-disable-next-line no-console
      console.error("FluidCanvas link:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const quad = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quad);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = U("u_res"),
      uTime = U("u_time"),
      uBias = U("u_bias"),
      uHoriz = U("u_horizontal"),
      uStill = U("u_still"),
      uSizeA = U("u_sizeA"),
      uSizeB = U("u_sizeB"),
      uFocusA = U("u_focusA"),
      uFocusB = U("u_focusB"),
      uImp = U("u_imp");

    // textures
    const sizes: Record<string, [number, number]> = {};
    const loadTex = (unit: number, url: string, key: string) => {
      const tex = gl.createTexture()!;
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE,
        new Uint8Array([10, 10, 12])
      );
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      const img = new Image();
      img.onload = () => {
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
        sizes[key] = [img.naturalWidth, img.naturalHeight];
      };
      img.src = url;
    };
    loadTex(0, imgA, "A");
    loadTex(1, imgB, "B");
    gl.uniform1i(U("u_texA"), 0);
    gl.uniform1i(U("u_texB"), 1);

    // pointer stirring: ring buffer of decaying vortices
    const imps = new Float32Array(8 * 4);
    let impHead = 0;
    let lastP: { x: number; y: number; t: number } | null = null;
    const onMove = (e: PointerEvent) => {
      if (reduce || e.pointerType !== "mouse") return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      const now = performance.now() / 1000;
      if (lastP && now - lastP.t < 0.03) return; // ~30 samples/s max
      const vx = lastP ? x - lastP.x : 0;
      const vy = lastP ? y - lastP.y : 0;
      const speed = Math.hypot(vx, vy);
      if (speed > 0.002) {
        const i = impHead * 4;
        imps[i] = x;
        imps[i + 1] = y;
        imps[i + 2] = 0; // age, advanced per frame
        imps[i + 3] = Math.max(-1.4, Math.min(1.4, (vx + vy) * 26));
        impHead = (impHead + 1) % 8;
      }
      lastP = { x, y, t: now };
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let last = performance.now();
    const start = last;
    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      // age the vortices
      for (let i = 0; i < 8; i++) {
        if (imps[i * 4 + 3] !== 0) {
          imps[i * 4 + 2] += dt;
          if (imps[i * 4 + 2] > 4) imps[i * 4 + 3] = 0;
        }
      }
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const W = Math.round(w * dpr);
      const H = Math.round(h * dpr);
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
        gl.viewport(0, 0, W, H);
      }
      gl.uniform2f(uRes, W, H);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.uniform1f(uBias, bias.get() / 100);
      gl.uniform1f(uHoriz, horizontal.current ? 1 : 0);
      gl.uniform1f(uStill, reduce ? 1 : 0);
      gl.uniform2f(uSizeA, ...(sizes.A ?? [16, 9]));
      gl.uniform2f(uSizeB, ...(sizes.B ?? [16, 9]));
      gl.uniform2f(uFocusA, focusA.x, 1 - focusA.y);
      gl.uniform2f(uFocusB, focusB.x, 1 - focusB.y);
      gl.uniform4fv(uImp, imps);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(render);

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(render);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      // NOTE: do not loseContext() here — under React StrictMode the effect
      // re-runs on the same canvas, which would inherit a dead context.
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgA, imgB, reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
