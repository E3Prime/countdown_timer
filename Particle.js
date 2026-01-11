export class Particle {
  /** @param {{width: number, height: number}} canvasState - Reference to the shared state object */
  constructor(canvasState) {
    this.canvasState = canvasState;

    /** @type {number} */ this.x = 0;
    /** @type {number} */ this.y = 0;
    /** @type {number} */ this.size = 0;
    /** @type {number} */ this.speed = 0;
    /** @type {number} */ this.alpha = 1;
    /** @type {number} */ this.driftAngle = 0;
    /** @type {number} */ this.driftSpeed = 0;
    /** @type {number} */ this.driftAmplitude = 0;

    // Initialize random values
    this.reset(true);
  }

  /** @param {boolean} [initial=false] - If true, scatter randomly across screen. | Resets the particle's position and properties. */
  reset(initial = false) {
    // Access width/height from the passed state object
    // Fallback to window size if state is not yet ready
    const w = this.canvasState.width || window.innerWidth;
    const h = this.canvasState.height || window.innerHeight;

    this.x = Math.random() * w;
    // If initial load, scatter vertically. If reusing, spawn just below viewport.
    this.y = initial ? Math.random() * h : h + 20;

    this.size = Math.random() * 2 + 0.5;
    this.speed = Math.random() * 1 + 0.5;
    this.alpha = Math.random() * 0.5 + 0.1;

    // Drift variables
    this.driftAngle = Math.random() * Math.PI * 2;
    this.driftSpeed = Math.random() * 0.05 + 0.02;
    this.driftAmplitude = Math.random() * 0.5;
  }

  update() {
    // Move up
    this.y -= this.speed;

    // Handle horizontal sway
    this.driftAngle += this.driftSpeed;
    this.x += Math.cos(this.driftAngle) * this.driftAmplitude;

    // Object pooling: reset if off-screen
    if (this.y < -10) {
      this.reset();
    }
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(217, 83, 79, ${this.alpha})`;
    ctx.fill();
  }
}
