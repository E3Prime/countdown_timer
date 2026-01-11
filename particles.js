import {Particle} from './Particle.js';

/**
 * Shared state to keep track of canvas dimensions.
 * Passed to Particle instances so they know boundaries.
 * @type {{ width: number, height: number }}
 */
const canvasState = {
  width: 0,
  height: 0,
};

initializeCanvas();

function initializeCanvas() {
  const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('particleCanvas'));
  const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));
  /** @type {Particle[]} */
  const particles = [];
  const particleCount = 70;
  new ResizeObserver((entries) => canvasResize(entries, canvas, ctx)).observe(canvas);

  for (let i = 0; i < particleCount; i++) {
    // Pass the shared canvasState object to each particle
    particles.push(new Particle(canvasState));
  }

  animate(ctx, particles);
}

/**
 * @param {ResizeObserverEntry[]} entries
 * @param {HTMLCanvasElement} canvas
 * @param {CanvasRenderingContext2D} ctx
 */
function canvasResize(entries, canvas, ctx) {
  const entry = entries[0];
  const {width: cssWidth, height: cssHeight} = entry.contentRect;
  const dpr = window.devicePixelRatio || 1;

  // Update Canvas Size (Drawing Buffer)
  canvas.width = Math.floor(cssWidth * dpr);
  canvas.height = Math.floor(cssHeight * dpr);

  // Scale Context for High DPI
  ctx.scale(dpr, dpr);

  // Update Shared State (so Particles know the new boundaries)
  canvasState.width = cssWidth;
  canvasState.height = cssHeight;
}

/**
 * The main animation loop.
 * @param {CanvasRenderingContext2D} ctx
 * @param {Particle[]} particles
 */
function animate(ctx, particles) {
  const w = canvasState.width;
  const h = canvasState.height;

  // Clear the canvas
  ctx.clearRect(0, 0, w, h);

  // Update and draw each particle
  particles.forEach((p) => {
    p.update();
    p.draw(ctx);
  });

  // Loop
  requestAnimationFrame(() => animate(ctx, particles));
}
