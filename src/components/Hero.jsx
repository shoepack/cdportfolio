import { HERO_CONTENT, ABOUT_TEXT } from "../constants";
import profilePic from "../assets/portrait-1.jpg";
import { motion } from "framer-motion";
const imageAnimation = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 1, delay: 0.3 },
};

const Hero = () => {
  return (
    <section className="border-b border-neutral-900 pb-4 lg:mb-35">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl">
              Jason Artley
            </h1>
            <h2 className="text-2xl font-light tracking-tight bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
              Full-Stack Engineer
            </h2>
            <p className="mt-6 max-w-xl text-lg font-light leading-relaxed tracking-tight">
              {HERO_CONTENT}
            </p>
            <h3 className="mt-8 mb-2 text-xl font-semibold">About Me</h3>
            <p className="max-w-xl pb-8 text-lg font-light leading-relaxed tracking-tight text-neutral-400">
              {ABOUT_TEXT}
            </p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 lg:p-8">
          <div className="flex justify-center">
            <motion.img
              {...imageAnimation}
              src={profilePic}
              alt="Jason Artley"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
