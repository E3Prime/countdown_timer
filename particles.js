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

const canvas = /** @type {HTMLCanvasElement} */ (document.getElementById('particleCanvas'));
const ctx = /** @type {CanvasRenderingContext2D} */ (canvas.getContext('2d'));

new ResizeObserver((entries) => canvasResize(entries)).observe(canvas);

/** @type {Particle[]} */
const particles = Array.from({length: 70}, () => new Particle(canvasState));

animate();

/** @param {ResizeObserverEntry[]} entries */
function canvasResize(entries) {
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

function animate() {
  const w = canvasState.width;
  const h = canvasState.height;

  ctx.clearRect(0, 0, w, h);

  // Update and draw each particle
  particles.forEach((p) => {
    p.update();
    p.draw(ctx);
  });

  // Loop
  requestAnimationFrame(() => animate());
}
