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

uniform float u_intro;       // 1 at load → 0: the identity coalesces out of chaos

void main() {
  vec2 uv = v_uv;
  float aspect = u_res.x / u_res.y;
  vec2 p = vec2(uv.x * aspect, uv.y) * 2.6;
  float t = u_time * (1.0 - u_still) * 0.045;
  float tt = u_time * (1.0 - u_still);

  // perpetual circulation: the liquid shears in a slow oscillating rotation
  // (bounded, so the field never winds up), differential with radius
  vec2 cen = vec2(1.3 * aspect, 1.3);
  vec2 cp = p - cen;
  float ca = 0.06 * sin(tt * 0.03 + length(cp) * 0.9);
  p = vec2(cp.x * cos(ca) - cp.y * sin(ca), cp.x * sin(ca) + cp.y * cos(ca)) + cen;

  // the cursor stirs the liquid: decaying analytic vortices displace the field
  vec2 stir = vec2(0.0);
  for (int i = 0; i < 8; i++) {
    vec4 imp = u_imp[i];
    if (imp.w == 0.0) continue;
    vec2 d = vec2((uv.x - imp.x) * aspect, uv.y - imp.y);
    float r2 = dot(d, d);
    float fall = exp(-r2 * 16.0) * exp(-imp.z * 0.9);
    stir += vec2(-d.y, d.x) * imp.w * fall;
  }
  p += stir * 2.4;

  // ink in water: two rounds of domain warping, drifting forever; turbulence
  // breathes on a slow cycle and starts high (the chaos the identity forms from)
  float turb = 1.0 + 0.7 * u_intro + 0.12 * sin(tt * 0.11 + 3.0);
  vec2 q = vec2(fbm(p + t * vec2(0.9, 0.35)),
                fbm(p + vec2(5.2, 1.3) - t * vec2(0.45, 0.75)));
  vec2 r = vec2(fbm(p + 2.4 * turb * q + vec2(1.7, 9.2) + t * 0.35),
                fbm(p + 2.4 * turb * q + vec2(8.3, 2.8) - t * 0.28));
  float field = fbm(p + 2.1 * turb * r);

  // where the inks meet: a bias-positioned interface, heavily warped by the
  // field so it forms tendrils, islands and eddies rather than a line
  float axis = mix(uv.y, uv.x, u_horizontal);
  float lead = mix(-0.22, 1.22, u_bias);
  float reach = 2.2 + 0.6 * u_intro;
  float m = smoothstep(-0.5, 0.5, ((axis - lead) * 3.4 + (field - 0.5) * reach) * 2.2);

  vec3 colA = texture2D(u_texA, coverUV(uv, u_sizeA, u_focusA)).rgb;
  vec3 colB = texture2D(u_texB, coverUV(uv, u_sizeB, u_focusB)).rgb;
  vec3 col = mix(colA, colB, m);

  // ink physics at the interface: mist bloom, a luminous filament core, and a
  // pigment-dark rim where the inks press against each other
  float meet = m * (1.0 - m) * 4.0;
  vec3 mist = mix(vec3(0.72, 0.78, 0.88), vec3(0.86, 0.82, 0.78), r.x);
  col += mist * meet * 0.08;
  col += mist * pow(meet, 3.0) * 0.12;
  col *= 1.0 - 0.10 * pow(meet, 2.0) * (0.4 + 0.6 * q.y);

  // cinematic grade: teal shadows, warm highlights, gentle vignette
  float lum = dot(col, vec3(0.299, 0.587, 0.114));
  col += vec3(-0.008, 0.003, 0.014) * (1.0 - lum) + vec3(0.012, 0.005, -0.007) * lum * 0.8;
  col *= 1.0 - 0.18 * smoothstep(0.35, 0.9, length(uv - 0.5) * 1.25);

  gl_FragColor = vec4(col, 1.0);
}`;

export type FluidHandles = {
  canvas: HTMLCanvasElement | null;
};

export default function FluidCanvas({
  imgA,
  imgB,
  fallbackA,
  fallbackB,
  focusA,
  focusB,
  bias,
  horizontal,
  reduce,
}: {
  imgA: string;
  imgB: string;
  /** JPEG fallback URLs, loaded if the primary (AVIF) fails to decode */
  fallbackA?: string;
  fallbackB?: string;
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
      // preserveDrawingBuffer lets the page transition snapshot the liquid
      // (canvas.toDataURL) so its fragments are real pieces of this screen.
      canvas.getContext("webgl", {
        antialias: false,
        alpha: false,
        preserveDrawingBuffer: true,
      }) ||
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
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
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
      uImp = U("u_imp"),
      uIntro = U("u_intro");

    // textures
    const sizes: Record<string, [number, number]> = {};
    const glTextures: WebGLTexture[] = [];
    // Set in cleanup so a still-in-flight img.onload doesn't bind/upload to a
    // texture the cleanup already deleted (a stale-closure use-after-delete).
    let disposed = false;
    const pendingImgs: HTMLImageElement[] = [];
    const loadTex = (unit: number, url: string, key: string, fallback?: string) => {
      const tex = gl.createTexture()!;
      glTextures.push(tex);
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
      pendingImgs.push(img);
      img.onload = () => {
        if (disposed) return;
        gl.activeTexture(gl.TEXTURE0 + unit);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
        sizes[key] = [img.naturalWidth, img.naturalHeight];
      };
      // If the AVIF fails to decode (older browser), fall back to the JPEG once.
      img.onerror = () => {
        if (disposed || !fallback || img.src.endsWith(fallback)) return;
        img.src = fallback;
      };
      img.src = url;
    };
    loadTex(0, imgA, "A", fallbackA);
    loadTex(1, imgB, "B", fallbackB);
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
        imps[i + 3] = Math.max(-1.3, Math.min(1.3, (vx + vy) * 24));
        impHead = (impHead + 1) % 8;
      }
      lastP = { x, y, t: now };
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let last = performance.now();
    const start = last;
    // Once the page-transition burst begins, an opaque overlay covers the
    // canvas — stop rendering the (heavy, Retina) shader so the explosion has
    // the whole GPU. The chooser unmounts on navigation right after.
    let paused = false;
    const onShatter = () => {
      paused = true;
      cancelAnimationFrame(raf);
    };
    window.addEventListener("shatter:go", onShatter);
    const render = (now: number) => {
      if (paused) return;
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
      // the identity coalesces out of chaos over the first ~2.8s
      const intro = reduce
        ? 0
        : Math.pow(Math.max(0, 1 - (now - start) / 2800), 2);
      gl.uniform1f(uIntro, intro);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(render);

    const onVis = () => {
      if (paused) return;
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(render);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("shatter:go", onShatter);
      window.removeEventListener("pointermove", onMove);
      // Stop any pending image decode from binding/uploading to a texture we're
      // about to delete (the onload closure checks `disposed` first).
      disposed = true;
      pendingImgs.forEach((img) => {
        img.onload = null;
        img.onerror = null;
        img.src = "";
      });
      // Release GPU resources so repeated navigations (/ → /playful → back → …)
      // don't accumulate contexts toward the browser's WebGL-context limit.
      // Delete the objects (safe: the effect recreates them on remount) rather
      // than loseContext(), which would hand a dead context to a StrictMode re-run.
      glTextures.forEach((t) => gl.deleteTexture(t));
      gl.deleteBuffer(quad);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgA, imgB, fallbackA, fallbackB, reduce]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
