import "./index.css";
import Canvas from "./Canvas";
import data from "./data";
import { useEffect, useState, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function App() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const showCanvasRef = useRef(null);
  const growSpanref = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, []);

  useEffect(() => {
    gsap.to("body", {
      color: darkMode ? "#fff" : "#000",
      backgroundColor: darkMode ? "#000" : "#fff",
      duration: 1,
      ease: "power2.inOut",
    });
  }, [darkMode]);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growSpanref.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1,
            ease: "power2.inOut",
          });

          gsap.to(growSpanref.current, {
            scale: 10000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growSpanref.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }
        return !prevShowCanvas;
      });
    };

    const heading = showCanvasRef.current;
    heading.addEventListener("click", handleClick);

    return () => heading.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <div className='relative w-full min-h-screen font-["Segoe_UI"]'>
        <span
          ref={growSpanref}
          className="bg-[#fd2c2a] grow block fixed top-[-20px] left-[-20px] w-2 h-2 rounded-full"
        ></span>

        {showCanvas &&
          data[0].map((canvasDetails, index) => {
            return <Canvas key={index} details={canvasDetails} />;
          })}

        <div className="w-full h-screen relative">
          {/* rest of content */}
          <nav className="w-full p-2 sm:p-4 flex justify-between items-center border-b border-gray-400">
            <div className="brand text-lg sm:text-xl md:text-2xl font-regular">
              <h1>thirtysixstudio</h1>
            </div>
            <div className="links hidden md:flex gap-4 lg:gap-10 items-center">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-sm lg:text-base hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex justify-center items-center w-12 h-7 sm:w-14 sm:h-8 rounded-full border border-gray-400 hover:bg-gray-500"
              >
                {darkMode ? (
                  <img
                    className="w-[35%]"
                    src="/src/assets/light-mode.svg"
                    alt=""
                  />
                ) : (
                  <img
                    className="w-[35%]"
                    src="/src/assets/dark-mode.svg"
                    alt=""
                  />
                )}
              </button>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="flex justify-center items-center w-10 h-6 rounded-full border border-gray-400 hover:bg-gray-500"
              >
                {darkMode ? (
                  <img
                    className="w-[35%]"
                    src="/src/assets/light-mode.svg"
                    alt=""
                  />
                ) : (
                  <img
                    className="w-[35%]"
                    src="/src/assets/dark-mode.svg"
                    alt=""
                  />
                )}
              </button>
            </div>
          </nav>

          <div className="textcontainer mt-2 px-4 sm:px-8 md:px-[10%] lg:px-[20%] w-full">
            <div className="text w-full md:w-[70%] lg:w-[50%]">
              <h3 className="text-xl sm:text-2xl md:text-3xl leading-[1.5]">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>

              <p className="text-base sm:text-lg w-full md:w-[90%] lg:w-[80%] mt-6 sm:mt-8 md:mt-10 font-thin leading-[1.5]">
                We're a boutique production studio focused on design, motion,
                and creative technology, constantly reimagining what digital
                craft can do for present-time ads and campaigns.
              </p>

              <p className="text-sm sm:text-base w-full md:w-[90%] lg:w-[80%] mt-6 sm:mt-8 md:mt-10 font-md leading-[1.5]">
                Scroll
              </p>
            </div>
          </div>

          <div className="flex justify-center items-center absolute bottom-0 left-0 w-full px-2">
            <h1
              ref={showCanvasRef}
              className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] xl:text-[15.8rem] font-normal tracking-tight leading-none text-center cursor-pointer"
            >
              Thirtysixstudio
            </h1>
          </div>
        </div>
      </div>

      <div className="w-full relative h-screen mt-10 px-4 sm:px-6 md:px-8 lg:px-10">
        {showCanvas &&
          data[1].map((canvasDetails, index) => {
            return <Canvas key={index} details={canvasDetails} />;
          })}

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          About the studio
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl w-full md:w-[90%] lg:w-[80%] mt-6 sm:mt-8 md:mt-10 font-thin pl-0 sm:pl-5 md:pl-10 leading-[1.6] sm:leading-[1.7] md:leading-[1.8]">
          We provide captivating design, interactive animations, advanced
          usability, reliable code, and immaculate project coordination. Whether
          you need a campaign built from scratch or assistance at a specific
          phase, we've got you covered.
        </p>
      </div>

      {/* Additional responsive sections */}

      <div className="relative w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-10">
        {showCanvas &&
          data[2].map((canvasDetails, index) => {
            return <Canvas key={index} details={canvasDetails} />;
          })}
      </div>

      <div className="relative w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-10">
        {showCanvas &&
          data[3].map((canvasDetails, index) => {
            return <Canvas key={index} details={canvasDetails} />;
          })}
      </div>

      <div className="relative w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-10">
        {showCanvas &&
          data[4].map((canvasDetails, index) => {
            return <Canvas key={index} details={canvasDetails} />;
          })}
      </div>

      <div className="relative w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-10">
        {showCanvas &&
          data[5].map((canvasDetails, index) => {
            return <Canvas key={index} details={canvasDetails} />;
          })}
      </div>

      <div className="relative w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-10">
        {showCanvas &&
          data[6].map((canvasDetails, index) => {
            return <Canvas key={index} details={canvasDetails} />;
          })}
      </div>

      <div className="relative w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-10">
        {showCanvas &&
          data[7].map((canvasDetails, index) => {
            return <Canvas key={index} details={canvasDetails} />;
          })}
      </div>

      <div className="relative w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-10">
        {showCanvas &&
          data[8].map((canvasDetails, index) => {
            return <Canvas key={index} details={canvasDetails} />;
          })}
      </div>

      <div className="relative w-full min-h-screen px-4 sm:px-6 md:px-8 lg:px-10">
        {showCanvas &&
          data[9].map((canvasDetails, index) => {
            return <Canvas key={index} details={canvasDetails} />;
          })}
      </div>
    </>
  );
}

export default App;
