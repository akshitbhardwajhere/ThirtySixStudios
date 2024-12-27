import React, { useEffect, useRef, useState } from 'react';
import canvasImages from './canvas-images';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Canvas = () => {
    const [index, setIndex] = useState({ value:0 });
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        
        const image = new Image();
        image.src = canvasImages[index.value];
        
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
        };
    });
        
    return <canvas ref={canvasRef} className='w-[18rem] h-[18rem]' id="canvas"></canvas>
}

export default Canvas;
