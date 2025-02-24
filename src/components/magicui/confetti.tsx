import confetti, { Options, create, shapeFromPath, shapeFromText } from "canvas-confetti";

interface ConfettiOptions extends Options {}

const Confetti = (options: ConfettiOptions) => {
    if (options.disableForReducedMotion && window.matchMedia("(prefers-reduced-motion)").matches) {
        return;
    }

    const confettiInstance = options.canvas
        ? create(options.canvas, {
              resize: options.resize ?? true,
              useWorker: options.useWorker ?? true,
          })
        : confetti;

    confettiInstance({
        ...options,
    });
};

Confetti.shapeFromPath = (options: { path: string; [key: string]: any }) => {
    return shapeFromPath({ ...options });
};

Confetti.shapeFromText = (options: { text: string; [key: string]: any }) => {
    return shapeFromText({ ...options });
};

export { Confetti };
