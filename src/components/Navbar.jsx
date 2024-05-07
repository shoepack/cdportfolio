import logo from "../assets/logo.png";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
      <div className="flex flex-shrink-0 items-center">
        <a href="/" className="mx-2">
          <img className="w-10" src={logo} alt="logo" />
        </a>
      </div>
      <div className="m-8 flex items-center justify-center gap-4 text-2xl">
        <a
          href="https://www.linkedin.com/in/jasonartley/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-700 transition duration-300"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/shoepack"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-700 transition duration-300"
        >
          <FaGithub />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
