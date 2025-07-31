import React, { useEffect, useRef, useState } from 'react';
import canvasImages from './canvas-images';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const Canvas = ({ details }) => {
    const { startIndex, numImages, duration, size, top, left, zIndex } = details;
    const [index, setIndex] = useState({ value: startIndex });
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
    const canvasRef = useRef(null);

    // Handle window resize
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Set initial size
        handleResize();
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate responsive size based on screen width
    const getResponsiveSize = () => {
        const screenWidth = windowSize.width || (typeof window !== 'undefined' ? window.innerWidth : 1920);
        let scaleFactor = 1;
        
        if (screenWidth < 480) { // small mobile
            scaleFactor = 0.3;
        } else if (screenWidth < 640) { // mobile
            scaleFactor = 0.4;
        } else if (screenWidth < 768) { // small tablet
            scaleFactor = 0.6;
        } else if (screenWidth < 1024) { // tablet
            scaleFactor = 0.8;
        } else if (screenWidth < 1280) { // small desktop
            scaleFactor = 0.9;
        }
        
        return size * scaleFactor;
    };

    // Calculate responsive positions
    const getResponsivePosition = (value, isTop = true) => {
        const screenWidth = windowSize.width || (typeof window !== 'undefined' ? window.innerWidth : 1920);
        
        if (screenWidth < 640) { // mobile
            // Adjust positions for mobile to prevent overflow
            if (isTop) {
                return Math.max(5, Math.min(value * 0.8, 85));
            } else {
                return Math.max(5, Math.min(value * 0.8, 75));
            }
        } else if (screenWidth < 768) { // tablet
            if (isTop) {
                return Math.max(2, Math.min(value * 0.9, 90));
            } else {
                return Math.max(2, Math.min(value * 0.9, 85));
            }
        }
        
        return value;
    };

    useGSAP(() => {
        gsap.to(index, {
            value: startIndex + numImages - 1,
            duration: duration,
            repeat: -1,
            ease: 'linear',
            onUpdate: () => {
                setIndex({ value: Math.round(index.value) });
            }
        })
        gsap.from(canvasRef.current, {
            opacity: 0,
            duration: 1,
            ease: 'power2.inOut',
            delay: 0.1
        })
    })

    useEffect(() => {
        const scale = window.devicePixelRatio || 1;
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        const img = new Image();
        img.src = canvasImages[index.value];
        
        img.onload = () => {
            const responsiveSize = getResponsiveSize();
            const displayWidth = responsiveSize * 1.4;
            const displayHeight = responsiveSize * 1.4;
            
            // Set actual canvas size in pixels (for high DPI)
            canvas.width = displayWidth * scale;
            canvas.height = displayHeight * scale;
            
            // Scale the canvas back down for display
            canvas.style.width = displayWidth + 'px';
            canvas.style.height = displayHeight + 'px';

            // Scale the drawing context to match device pixel ratio
            ctx.scale(scale, scale);
            
            // Clear canvas before drawing
            ctx.clearRect(0, 0, displayWidth, displayHeight);
            
            // Draw the image
            ctx.drawImage(img, 0, 0, displayWidth, displayHeight);
        };
        
        img.onerror = () => {
            console.warn(`Failed to load canvas image: ${canvasImages[index.value]}`);
        };
    }, [index, windowSize]);
        

    return (
        <canvas 
        data-scroll
        data-scroll-speed={Math.random().toFixed(1)} 
        ref={canvasRef} 
        className='absolute' 
        style={{ 
            width: `${getResponsiveSize() * 1.4}px`, 
            height: `${getResponsiveSize() * 1.4}px`, 
            top: `${getResponsivePosition(top, true)}%`, 
            left: `${getResponsivePosition(left, false)}%`, 
            zIndex: `${zIndex}`,
            maxWidth: '90vw',
            maxHeight: '90vh'
        }} 
        id="canvas"></canvas>
    )
}

export default Canvas;
