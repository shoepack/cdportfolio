import logo from "../assets/logo.png";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/jasonartley/",
    label: "LinkedIn",
    icon: <FaLinkedin />,
  },
  {
    href: "https://github.com/shoepack",
    label: "GitHub",
    icon: <FaGithub />,
  },
];

const Navbar = () => {
  return (
    <nav className="mb-20 flex items-center justify-between py-6">
      <div className="flex flex-shrink-0 items-center">
        <a href="/" className="mx-2">
          <img className="w-10" src={logo} alt="logo" />
        </a>
      </div>
      <div className="m-8 flex items-center justify-center gap-4 text-2xl">
        {socialLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="hover:text-gray-700 transition duration-300"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
