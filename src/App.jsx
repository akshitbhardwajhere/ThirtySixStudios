import './index.css'
import Canvas from './Canvas'
import data from './data'
import { useEffect, useState, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const showCanvasRef = useRef(null);
  const growSpanref = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, [])
  
  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growSpanref.current, {
            top: e.clientY,
            left: e.clientX,
          })
  
          gsap.to('body', {
            color: "#000", 
            backgroundColor: "#fd2c2a",
            duration: 1,
            ease: 'power2.inOut',
          })
          
          gsap.to(growSpanref.current, {
            scale: 10000,
            duration: 2,
            ease: 'power2.inOut',
            onComplete: () => {
              gsap.set(growSpanref.current, {
                scale: 0,
                clearProps: 'all',
              })
            }
          })
        }
        else {
          gsap.to('body', {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: 'power2.inOut',
          })
        }
        return !prevShowCanvas;
      });
    }

    const heading = showCanvasRef.current;
    heading.addEventListener('click', handleClick);

    return () => heading.removeEventListener('click', handleClick);
    
  }, [])

  return(
    <>
      <div className='relative w-full min-h-screen   font-["Segoe_UI"]'>

        <span ref={growSpanref} className='bg-[#fd2c2a] grow block fixed top-[-20px] left-[-20px] w-2 h-2 rounded-full'></span>

        {showCanvas && data[0].map((canvasDetails, index) => {
          return <Canvas details={canvasDetails} />
        })}

        <div className='w-full h-screen relative'>

          <nav className='w-full p-2  flex justify-between items-center border-b border-gray-400'>
            <div className='brand   text-2xl font-regular'>
              <h1>thirtysixstudio</h1>
            </div>
            <div className='links flex gap-10'>
              {["What we do", "Who we are", "How we give back", "Talk to us"].map((link, index) => (
                <a key={index} href={`#${link.toLowerCase()}`}
                className='text-medium hover:text-gray-300'>{link}</a>
              ))}
            </div>
          </nav>

          <div className='textcontainer mt-2 px-[20%] w-full'>

            <div className='text w-[50%]'>

              <h3 className='text-3xl leading-[1.5]'>
                At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.
              </h3>

              <p className='text-lg w-[80%] mt-10 font-thin leading-[1.5]'>
                We’re a boutique production studio focused on design, motion, and creative technology, constantly reimagining what digital craft can do for present-time ads and campaigns.
              </p>

              <p className='text-medium w-[80%] mt-10 font-md leading-[1.5]'>
                Scroll
              </p>

            </div>

          </div>

          <div className='flex justify-center items-center absolute bottom-0 left-0 w-full'>

            <h1 ref={showCanvasRef} className='text-[15.8rem] font-normal tracking-tight leading-none'>
              Thirtysixstudio
            </h1>

          </div>

        </div>

      </div>

      <div className='w-full relative h-screen  mt-10 px-10'>

      {showCanvas && data[1].map((canvasDetails, index) => {
          return <Canvas details={canvasDetails} />
        })}

        <h1 className='text-5xl'>About the studio</h1>
        
        <p className='text-2xl w-[80%] mt-10 font-thin pl-10 leading-[1.8]'>We provide captivating design, interactive animations, advanced usability, reliable code, and immaculate project coordination. Whether you need a campaign built from scratch or assistance at a specific phase, we’ve got you covered.</p>

      </div>



      {/* You can add content in the divs below */}

      {/* <div className='relative w-full min-h-screen  '>
        {showCanvas && data[2].map((canvasDetails, index) => {
            return <Canvas details={canvasDetails} />
           })}
      </div>

      <div className='relative w-full min-h-screen  '>
        {showCanvas && data[3].map((canvasDetails, index) => {
            return <Canvas details={canvasDetails} />
           })}
      </div>

      <div className='relative w-full min-h-screen  '>
        {showCanvas && data[4].map((canvasDetails, index) => {
            return <Canvas details={canvasDetails} />
           })}
      </div>

      <div className='relative w-full min-h-screen  '>
        {showCanvas && data[5].map((canvasDetails, index) => {
            return <Canvas details={canvasDetails} />
           })}
      </div>

      <div className='relative w-full min-h-screen  '>
        {showCanvas && data[6].map((canvasDetails, index) => {
            return <Canvas details={canvasDetails} />
           })}
      </div>

      <div className='relative w-full min-h-screen  '>
        {showCanvas && data[7].map((canvasDetails, index) => {
            return <Canvas details={canvasDetails} />
           })}
      </div>

      <div className='relative w-full min-h-screen  '>
        {showCanvas && data[8].map((canvasDetails, index) => {
            return <Canvas details={canvasDetails} />
           })}
      </div>

      <div className='relative w-full min-h-screen  '>
        {showCanvas && data[9].map((canvasDetails, index) => {
            return <Canvas details={canvasDetails} />
           })}
      </div> */}
    </>
  )
}

export default App
