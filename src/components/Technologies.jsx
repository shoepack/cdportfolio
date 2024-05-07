import {
  FaHtml5,
  FaCss3Alt,
  FaNodeJs,
  FaReact,
  FaGithub,
} from "react-icons/fa";
import { PiFigmaLogoFill } from "react-icons/pi";
import { motion } from "framer-motion";

const iconVariants = (duration) => ({
  initial: { y: -10 },
  animate: {
    y: [10, -10],
    transition: {
      duration: duration,
      ease: "linear",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
});

const Technologies = () => {
  return (
    <div className="border-b border-neutral-800 pb-24">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-20 text-center text-4xl"
      >
        Technical Skills
      </motion.h2>
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 1.5 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        {/* HTML */}
        <motion.div
          variants={iconVariants(3)}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center rounded-2xl border-4 border-neutral-800 p-4"
        >
          <FaHtml5 className="text-7xl text-orange-600" />
          <span className="mt-2 text-center text-sm">HTML5</span>
        </motion.div>

        {/* CSS */}
        <motion.div
          variants={iconVariants(4.5)}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center rounded-2xl border-4 border-neutral-800 p-4"
        >
          <FaCss3Alt className="text-7xl text-blue-600" />
          <span className="mt-2 text-center text-sm">CSS3</span>
        </motion.div>

        {/* Node.js */}
        <motion.div
          variants={iconVariants(2)}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center rounded-2xl border-4 border-neutral-800 p-4"
        >
          <FaNodeJs className="text-7xl text-green-600" />
          <span className="mt-2 text-center text-sm">Node.js</span>
        </motion.div>

        {/* React */}
        <motion.div
          variants={iconVariants(4)}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center rounded-2xl border-4 border-neutral-800 p-4"
        >
          <FaReact className="text-7xl text-cyan-400" />
          <span className="mt-2 text-center text-sm">React</span>
        </motion.div>

        {/* Git */}
        <motion.div
          variants={iconVariants(5)}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center rounded-2xl border-4 border-neutral-800 p-4"
        >
          <FaGithub className="text-7xl text-white" />
          <span className="mt-2 text-center text-sm">Git/GitHub</span>
        </motion.div>

        {/* Figma */}
        <motion.div
          variants={iconVariants(2)}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center rounded-2xl border-4 border-neutral-800 p-4"
        >
          <PiFigmaLogoFill className="text-7xl text-yellow-400" />
          <span className="mt-2 text-center text-sm">Figma</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Technologies;
