/**
 * LiquidReveal — hover líquido (metaball + ruído + refração) que revela a
 * imagem B por cima da imagem A. WebGL1 puro, sem dependências.
 */

export interface LiquidRevealOptions {
  canvas: HTMLCanvasElement;
  container: HTMLElement;
  imageAUrl: string;
  imageBUrl: string;
  radius?: number;
  edgeSoftness?: number;
  noiseScale?: number;
  noiseStrength?: number;
  noiseSpeed?: number;
  mouseDamping?: number;
  trailDamping?: number;
  refractionStrength?: number;
}

const TRAIL_COUNT = 24;

const VERTEX_SHADER = /* glsl */ `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = /* glsl */ `
precision highp float;

varying vec2 v_uv;

uniform sampler2D u_texA;
uniform sampler2D u_texB;
uniform vec2 u_resolution;
uniform vec2 u_image_resolution;
uniform vec2 u_trail[${TRAIL_COUNT}];
uniform float u_radii[${TRAIL_COUNT}];
uniform int u_trail_count;
uniform float u_speed;
uniform float u_time;
uniform float u_progress;
uniform float u_edge_softness;
uniform float u_noise_scale;
uniform float u_noise_strength;
uniform float u_noise_speed;
uniform float u_refraction_strength;

// --- Simplex Noise 2D — Ian McEwan, Ashima Arts (domínio público/MIT) ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187,
                      0.366025403784439,
                     -0.577350269189626,
                      0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m;
  m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Ruído orgânico multi-oitava: 3 camadas derivando em direções diferentes.
float organicNoise(vec2 p, float time) {
  float n1 = snoise(p * u_noise_scale + vec2(time * u_noise_speed * 0.5, time * u_noise_speed * 0.3));
  float n2 = snoise(p * (u_noise_scale * 2.2) - vec2(time * u_noise_speed * 0.7, -time * u_noise_speed * 0.6));
  float n3 = snoise(p * (u_noise_scale * 4.4) + vec2(-time * u_noise_speed * 0.9, time * u_noise_speed * 0.8));
  return n1 * 0.6 + n2 * 0.3 + n3 * 0.1;
}

// Smooth minimum polinomial — o coração do efeito metaball.
float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

// SDF de cápsula entre A e B com raios variáveis (cone arredondado).
float capsuleSDF(vec2 p, vec2 a, vec2 b, float ra, float rb) {
  vec2 ba = b - a;
  vec2 pa = p - a;
  float lenSq = dot(ba, ba);
  float h = lenSq > 1e-7 ? clamp(dot(pa, ba) / lenSq, 0.0, 1.0) : 0.0;
  float r = mix(ra, rb, h);
  return length(pa - ba * h) - r;
}

void main() {
  // 1. Enquadramento "cover"
  float canvasRatio = u_resolution.x / u_resolution.y;
  float imageRatio = u_image_resolution.x / u_image_resolution.y;

  // Desvio intencional do prompt original: a fórmula de lá (imageRatio/canvasRatio
  // no eixo x) amostrava MAIS que a imagem inteira (efeito "contain" + bordas
  // borradas pelo clamp). Para "cover" a escala tem que ser <= 1 no eixo cortado.
  vec2 coverScale = canvasRatio < imageRatio
    ? vec2(canvasRatio / imageRatio, 1.0)
    : vec2(1.0, imageRatio / canvasRatio);

  vec2 uv = (v_uv - 0.5) * coverScale + 0.5;

  // Espaço corrigido por aspecto
  vec2 aspect = vec2(canvasRatio, 1.0);
  vec2 p = v_uv * aspect;

  // 2. Campo de distância da trilha fluida
  float d = 1e5;

  for (int i = 0; i < ${TRAIL_COUNT - 1}; i++) {
    if (i >= u_trail_count - 1) break;
    vec2 pA = u_trail[i] * aspect;
    vec2 pB = u_trail[i+1] * aspect;
    float rA = u_radii[i];
    float rB = u_radii[i+1];

    if (rA < 0.0001 && rB < 0.0001) continue;

    float seg = capsuleSDF(p, pA, pB, rA, rB);
    d = (i == 0) ? seg : smin(d, seg, 0.045);
  }

  // 3. Respiração em repouso + deformação orgânica
  float breathing = (sin(u_time * 2.2) * 0.012 + cos(u_time * 3.4) * 0.008) * (1.0 - min(u_speed * 4.0, 0.8));
  float noiseDisplacement = organicNoise(p, u_time) * u_noise_strength * (1.0 + u_speed * 0.8);

  float deformedDist = d - noiseDisplacement - breathing;

  // 4. Máscara de revelação
  float mask = 1.0 - smoothstep(-u_edge_softness, u_edge_softness, deformedDist);
  mask = clamp(mask * u_progress, 0.0, 1.0);

  // 5. Refração de menisco (só na faixa da borda)
  float edgeBand = smoothstep(0.0, 0.5, mask) * smoothstep(1.0, 0.5, mask);

  vec2 eps = vec2(0.01, 0.0);
  float nx = organicNoise(p + eps.xy, u_time) - organicNoise(p - eps.xy, u_time);
  float ny = organicNoise(p + eps.yx, u_time) - organicNoise(p - eps.yx, u_time);
  vec2 normalOffset = vec2(nx, ny) * u_refraction_strength * edgeBand;

  vec2 uvA = clamp(uv + normalOffset * 0.25, 0.0, 1.0);
  vec2 uvB = clamp(uv + normalOffset * 0.7, 0.0, 1.0);

  vec4 colorA = texture2D(u_texA, uvA);
  vec4 colorB = texture2D(u_texB, uvB);

  gl_FragColor = mix(colorA, colorB, mask);
}
`;

const UNIFORM_NAMES = [
  'u_texA',
  'u_texB',
  'u_resolution',
  'u_image_resolution',
  'u_trail',
  'u_radii',
  'u_trail_count',
  'u_speed',
  'u_time',
  'u_progress',
  'u_edge_softness',
  'u_noise_scale',
  'u_noise_strength',
  'u_noise_speed',
  'u_refraction_strength',
] as const;

type UniformName = (typeof UNIFORM_NAMES)[number];

interface Point {
  x: number;
  y: number;
}

export class LiquidReveal {
  private canvas: HTMLCanvasElement;
  private container: HTMLElement;
  private imageAUrl: string;
  private imageBUrl: string;

  private radius: number;
  private userRadius: number | undefined;
  private edgeSoftness: number;
  private noiseScale: number;
  private noiseStrength: number;
  private noiseSpeed: number;
  private mouseDamping: number;
  private trailDamping: number;
  private refractionStrength: number;

  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private buffer: WebGLBuffer | null = null;
  private texA: WebGLTexture | null = null;
  private texB: WebGLTexture | null = null;
  private uniforms = {} as Record<UniformName, WebGLUniformLocation | null>;
  private imageResolution = { w: 1, h: 1 };
  private loadedCount = 0;

  private trailPoints: Point[] = [];
  private trailArray = new Float32Array(TRAIL_COUNT * 2);
  private radiiArray = new Float32Array(TRAIL_COUNT);
  private targetMouse: Point = { x: 0.5, y: 0.5 };
  private prevHead: Point = { x: 0.5, y: 0.5 };
  private currentSpeed = 0;
  private currentProgress = 0;
  private isHovered = false;

  private rafId = 0;
  private startTime = performance.now();
  private resizeObserver: ResizeObserver | null = null;
  private destroyed = false;
  private images: HTMLImageElement[] = [];

  constructor(options: LiquidRevealOptions) {
    this.canvas = options.canvas;
    this.container = options.container;
    this.imageAUrl = options.imageAUrl;
    this.imageBUrl = options.imageBUrl;

    this.userRadius = options.radius;
    this.radius = options.radius ?? 0.075;
    this.edgeSoftness = options.edgeSoftness ?? 0.024;
    this.noiseScale = options.noiseScale ?? 2.8;
    this.noiseStrength = options.noiseStrength ?? 0.035;
    this.noiseSpeed = options.noiseSpeed ?? 0.65;
    this.mouseDamping = options.mouseDamping ?? 0.22;
    this.trailDamping = options.trailDamping ?? 0.42;
    this.refractionStrength = options.refractionStrength ?? 0.012;

    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      this.noiseSpeed = 0.1;
      this.noiseStrength = 0.01;
      this.mouseDamping = 0.35;
    }

    for (let i = 0; i < TRAIL_COUNT; i++) this.trailPoints.push({ x: 0.5, y: 0.5 });

    this.gl = this.canvas.getContext('webgl', {
      alpha: false,
      antialias: true,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });

    if (!this.gl) {
      console.warn('[LiquidReveal] WebGL indisponível — exibindo a imagem A estática.');
      this.showStaticFallback();
      return;
    }

    if (!this.initGL()) {
      this.showStaticFallback();
      return;
    }

    this.bindEvents();
    this.resize();

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(this.container);
    } else {
      window.addEventListener('resize', this.resize);
    }

    this.loadTextures();
  }

  // ---------------------------------------------------------------- setup

  private showStaticFallback() {
    const s = this.canvas.style;
    s.backgroundImage = `url("${this.imageAUrl}")`;
    s.backgroundSize = 'cover';
    s.backgroundPosition = 'center';
  }

  private compile(type: number, source: string): WebGLShader | null {
    const gl = this.gl!;
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('[LiquidReveal] Erro de compilação do shader:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  private initGL(): boolean {
    const gl = this.gl!;
    const vs = this.compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = this.compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return false;

    const program = gl.createProgram();
    if (!program) return false;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('[LiquidReveal] Erro de link do programa:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return false;
    }
    this.program = program;
    gl.useProgram(program);

    // Quad full-screen (2 triângulos)
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const aPosition = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Cache de todas as uniform locations (uma vez só)
    for (const name of UNIFORM_NAMES) {
      this.uniforms[name] = gl.getUniformLocation(program, name);
    }

    gl.uniform1i(this.uniforms.u_texA, 0);
    gl.uniform1i(this.uniforms.u_texB, 1);
    return true;
  }

  private createTexture(unit: number, image: HTMLImageElement): WebGLTexture | null {
    const gl = this.gl!;
    const tex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    // Obrigatório para texturas não-potência-de-2 em WebGL1. Sem mipmap.
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    return tex;
  }

  private loadTextures() {
    const load = (url: string, unit: 0 | 1) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.decoding = 'async';
      img.onload = () => {
        if (this.destroyed || !this.gl) return;
        const tex = this.createTexture(unit, img);
        if (unit === 0) {
          this.texA = tex;
          this.imageResolution = { w: img.naturalWidth, h: img.naturalHeight };
        } else {
          this.texB = tex;
        }
        this.loadedCount++;
        // Só renderiza quando AMBAS as texturas estiverem prontas
        if (this.loadedCount === 2) this.start();
      };
      img.onerror = () => {
        console.warn(`[LiquidReveal] Falha ao carregar a imagem: ${url}`);
        if (unit === 0) this.showStaticFallback();
      };
      img.src = url;
      this.images.push(img);
    };
    load(this.imageAUrl, 0);
    load(this.imageBUrl, 1);
  }

  private start() {
    this.startTime = performance.now();
    this.rafId = requestAnimationFrame(this.render);
  }

  // ---------------------------------------------------------------- eventos

  private bindEvents() {
    const opts: AddEventListenerOptions = { passive: true };
    const c = this.container;
    c.addEventListener('mousemove', this.onMouseMove, opts);
    c.addEventListener('mouseenter', this.onMouseEnter, opts);
    c.addEventListener('mouseleave', this.onLeave, opts);
    c.addEventListener('touchstart', this.onTouchStart, opts);
    c.addEventListener('touchmove', this.onTouchMove, opts);
    c.addEventListener('touchend', this.onLeave, opts);
    c.addEventListener('touchcancel', this.onLeave, opts);
  }

  private unbindEvents() {
    const c = this.container;
    c.removeEventListener('mousemove', this.onMouseMove);
    c.removeEventListener('mouseenter', this.onMouseEnter);
    c.removeEventListener('mouseleave', this.onLeave);
    c.removeEventListener('touchstart', this.onTouchStart);
    c.removeEventListener('touchmove', this.onTouchMove);
    c.removeEventListener('touchend', this.onLeave);
    c.removeEventListener('touchcancel', this.onLeave);
    window.removeEventListener('resize', this.resize);
  }

  private toLocal(clientX: number, clientY: number): Point {
    const rect = this.container.getBoundingClientRect();
    const x = rect.width > 0 ? (clientX - rect.left) / rect.width : 0.5;
    const y = rect.height > 0 ? (clientY - rect.top) / rect.height : 0.5;
    return { x: Math.min(1, Math.max(0, x)), y: Math.min(1, Math.max(0, y)) };
  }

  /** Colapsa a trilha inteira na posição de entrada (evita o "chicote"). */
  private collapseTrail(p: Point) {
    for (const pt of this.trailPoints) {
      pt.x = p.x;
      pt.y = p.y;
    }
    this.prevHead = { x: p.x, y: p.y };
    this.targetMouse = { x: p.x, y: p.y };
    this.currentSpeed = 0;
  }

  private onMouseMove = (e: MouseEvent) => {
    // Cobre o caso de a página carregar com o cursor já dentro do container
    if (!this.isHovered) {
      this.onMouseEnter(e);
      return;
    }
    this.targetMouse = this.toLocal(e.clientX, e.clientY);
  };

  private onMouseEnter = (e: MouseEvent) => {
    this.collapseTrail(this.toLocal(e.clientX, e.clientY));
    this.isHovered = true;
  };

  private onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    this.collapseTrail(this.toLocal(t.clientX, t.clientY));
    this.isHovered = true;
  };

  private onTouchMove = (e: TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    this.targetMouse = this.toLocal(t.clientX, t.clientY);
  };

  private onLeave = () => {
    this.isHovered = false;
  };

  // ---------------------------------------------------------------- API

  resize = () => {
    if (!this.gl) return;
    const width = this.container.clientWidth;

    if (this.userRadius === undefined) {
      if (width < 768) this.radius = 0.095;
      else if (width < 1200) this.radius = 0.082;
      else this.radius = 0.072;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(1, Math.round(this.canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(this.canvas.clientHeight * dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  };

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    cancelAnimationFrame(this.rafId);
    this.resizeObserver?.disconnect();
    this.resizeObserver = null;
    this.unbindEvents();
    for (const img of this.images) {
      img.onload = null;
      img.onerror = null;
    }
    const gl = this.gl;
    if (gl) {
      if (this.texA) gl.deleteTexture(this.texA);
      if (this.texB) gl.deleteTexture(this.texB);
      if (this.buffer) gl.deleteBuffer(this.buffer);
      if (this.program) gl.deleteProgram(this.program);
    }
    this.texA = this.texB = null;
    this.buffer = null;
    this.program = null;
    this.gl = null;
  }

  // ---------------------------------------------------------------- loop

  private render = (now: number) => {
    if (this.destroyed || !this.gl) return;
    const gl = this.gl;
    const pts = this.trailPoints;

    // A) Cabeça persegue o mouse
    const head = pts[0];
    head.x += (this.targetMouse.x - head.x) * this.mouseDamping;
    head.y += (this.targetMouse.y - head.y) * this.mouseDamping;

    // B) Velocidade instantânea suavizada
    const dx = head.x - this.prevHead.x;
    const dy = head.y - this.prevHead.y;
    const instantSpeed = Math.sqrt(dx * dx + dy * dy);
    this.currentSpeed += (instantSpeed - this.currentSpeed) * 0.25;
    this.prevHead = { x: head.x, y: head.y };

    // C) Corrente elástica — damping cresce ao longo da cauda
    for (let i = 1; i < TRAIL_COUNT; i++) {
      const damping = Math.min(0.55, this.trailDamping + (i / TRAIL_COUNT) * 0.08);
      pts[i].x += (pts[i - 1].x - pts[i].x) * damping;
      pts[i].y += (pts[i - 1].y - pts[i].y) * damping;
    }

    // D) Progresso — entra rápido, sai devagar
    if (this.isHovered) this.currentProgress += (1.0 - this.currentProgress) * 0.16;
    else this.currentProgress += (0.0 - this.currentProgress) * 0.09;
    if (this.currentProgress < 0.0001 && !this.isHovered) this.currentProgress = 0.0;

    // E) Raios afinando + expansão por velocidade
    const speedExpansion = 1.0 + Math.min(this.currentSpeed * 12.0, 0.45);
    for (let i = 0; i < TRAIL_COUNT; i++) {
      this.trailArray[i * 2] = pts[i].x;
      this.trailArray[i * 2 + 1] = pts[i].y;
      const t = i / (TRAIL_COUNT - 1);
      const taper = Math.pow(1.0 - t, 1.15);
      this.radiiArray[i] = this.radius * taper * speedExpansion;
    }

    // F) Uniforms + draw
    const u = this.uniforms;
    gl.uniform2f(u.u_resolution, this.canvas.width, this.canvas.height);
    gl.uniform2f(u.u_image_resolution, this.imageResolution.w, this.imageResolution.h);
    gl.uniform2fv(u.u_trail, this.trailArray);
    gl.uniform1fv(u.u_radii, this.radiiArray);
    gl.uniform1i(u.u_trail_count, TRAIL_COUNT);
    gl.uniform1f(u.u_speed, this.currentSpeed);
    gl.uniform1f(u.u_time, (now - this.startTime) / 1000);
    gl.uniform1f(u.u_progress, this.currentProgress);
    gl.uniform1f(u.u_edge_softness, this.edgeSoftness);
    gl.uniform1f(u.u_noise_scale, this.noiseScale);
    gl.uniform1f(u.u_noise_strength, this.noiseStrength);
    gl.uniform1f(u.u_noise_speed, this.noiseSpeed);
    gl.uniform1f(u.u_refraction_strength, this.refractionStrength);

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texA);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.texB);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
    this.rafId = requestAnimationFrame(this.render);
  };
}
