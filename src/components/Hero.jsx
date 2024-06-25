
import { useState } from "react";
import { logo, settings } from "../assets";
import Modals from "./Modal";
import { ReactTyped } from "react-typed";

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav className='flex justify-between items-center w-full mb-10 pt-3'>
        <img src={logo} alt='sumz_logo' className='w-28 object-contain' />
        <div className="flex gap-4">
          <button
            type='button'
              onClick={() =>
                 window.open("https://github.com/kh-mahmoud/AI_Lite_Sum_Tool", "_blank")
             }
            className='black_btn'
          >
            GitHub
          </button>
          <img onClick={() => setIsOpen((prev) => !prev)} className="cursor-pointer hover:rotate-45 transition duration-300 ease-in-out" src={settings} alt="settings" />
        </div>
        <Modals isOpen={isOpen} setIsOpen={setIsOpen} />
      </nav>

      <h1 className='head_text'>
        Summarize Articles with <br className='max-md:hidden' />
        <span className='orange_gradient '>OpenAI GPT-4</span>
      </h1>
      <h2 className='desc'>
        <ReactTyped
          strings={['Simplify your reading with Summize, an open-source article summarizer that transforms lengthy articles into clear and concise summaries']}
          typeSpeed={45}
          showCursor={false}
          loop={false}
        />
      </h2>
    </header>
  );
};

export default Hero;
