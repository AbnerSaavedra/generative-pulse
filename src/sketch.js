/* global p5 */

export const createGenerativeSketch = (containerId, getState) => {
  return new p5((s) => {
    let phase = 0;

    const fitCanvas = () => {
      const root = document.getElementById(containerId);
      if (!root) {
        return;
      }

      const size = Math.max(180, Math.min(root.clientWidth, root.clientHeight || root.clientWidth));
      s.resizeCanvas(size, size);
    };

    s.setup = () => {
      const root = document.getElementById(containerId);
      const size = Math.max(180, root?.clientWidth || 320);
      const canvas = s.createCanvas(size, size);
      canvas.parent(containerId);
      s.noFill();
      s.strokeWeight(2);
      fitCanvas();
    };

    s.windowResized = () => {
      fitCanvas();
    };

    s.draw = () => {
      const state = getState();
      const progress = 1 - state.remainingSeconds / Math.max(1, state.totalSeconds);
      const pulse = state.pulseBoost;

      s.background(state.isBreak ? '#10382f' : '#161b2f');
      s.translate(s.width / 2, s.height / 2);

      const rings = 9;
      for (let i = 0; i < rings; i += 1) {
        const t = i / (rings - 1);
        const radius = s.width * (0.16 + t * 0.62 + Math.sin(phase + i * 0.6) * 0.02);
        const hueShift = state.isBreak ? 35 : 0;

        s.stroke(
          140 + hueShift + 90 * (1 - t),
          130 + 80 * t,
          180 + 30 * Math.sin(progress * Math.PI * 2 + i),
          150,
        );

        s.circle(0, 0, radius + pulse * 18 * (1 - t));
      }

      const orbitCount = 22;
      for (let i = 0; i < orbitCount; i += 1) {
        const angle = phase * 0.8 + i * (Math.PI * 2 / orbitCount);
        const orbit = s.width * (0.24 + progress * 0.22 + ((i % 4) * 0.02));
        const x = Math.cos(angle) * orbit;
        const y = Math.sin(angle) * orbit;

        s.noStroke();
        s.fill(state.isBreak ? '#7fd8b6cc' : '#ffd78fcc');
        s.circle(x, y, 3 + (i % 3));
      }

      phase += state.isRunning ? 0.025 : 0.008;
      state.pulseBoost = Math.max(0, state.pulseBoost - 0.04);
    };
  });
};
