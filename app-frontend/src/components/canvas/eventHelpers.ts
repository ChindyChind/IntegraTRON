import { SyntheticEvent } from 'react';

const extractOffSetFromEvent = (
    e: SyntheticEvent<HTMLCanvasElement>,
    scalingFactor: number,
    canvasRef: HTMLCanvasElement
) => {
    const {
        offsetX,
        offsetY,
        touches,
        clientX: mouseClientX,
        clientY: mouseClientY
    } = e.nativeEvent as any;

    if (offsetX && offsetY) {
        return {
            offsetX: offsetX * scalingFactor,
            offsetY: offsetY * scalingFactor
        };
    }

    const clientX = touches && touches.length ? touches[0].clientX : mouseClientX;
    const clientY = touches && touches.length ? touches[0].clientY : mouseClientY;
    const rect = canvasRef.getBoundingClientRect();
    const x = (clientX - rect.left) * scalingFactor;
    const y = (clientY - rect.top) * scalingFactor;
    return {
        offsetX: x,
        offsetY: y
    };
};

export { extractOffSetFromEvent };