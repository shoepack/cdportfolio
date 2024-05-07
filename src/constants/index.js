import project1 from "../assets/projects/project-1.png";
import project2 from "../assets/projects/project-2.png";
import project3 from "../assets/projects/project-3.png";
import project4 from "../assets/projects/project-4.png";

export const HERO_CONTENT = `I'm a passionate front-end developer specializing in crafting intuitive and dynamic web experiences using HTML, CSS, JavaScript, and React. I focus on designing intuitive interfaces, paying attention to detail, and delivering quality user experiences that exceed client and user expectations.`;

export const ABOUT_TEXT = `I am a soon-to-be graduate from the University of California, San Diego, earning a B.S. in Cognitive Science with a specialization in Design and Interaction. During my studies, I honed my skills in working efficiently within multidisciplinary teams, consisting of both designers and developers. This collaborative experience has become my area of expertise. Beyond my academic and professional pursuits, I enjoy hosting servers for gaming and media sharing, creating enjoyable experiences for my friends and family.`;

export const EXPERIENCES = [
  {
    year: "Aug 2020 - Dec 2020",
    role: "Math & Computer Science Tutor",
    company: "MiraCosta College",
    description: `Provided one-on-one tutoring in mathematics and computer science, with a focus on Java and Python. Guided students in problem-solving and critical thinking while fostering a supportive learning environment tailored to diverse styles and needs.`,
    technologies: ["Python", "Java", "C++", "Mentor"],
  },
];

export const PROJECTS = [
  {
    title: "CodeLink Collaborative Coding Prototype",
    image: project1,
    description:
      "A collaborative 2v2 Python programming space centered around the driver/navigator co-learning method. Conducted competitive analysis, prototyping, and surveys to create a user-friendly environment for team-based learning.",
    technologies: ["Python", "Figma", "User Experience (UX)"],
    link: [
      "https://sites.google.com/ucsd.edu/codelink123/home",
    ],
  },
  {
    title: "Dynamic Data Presentation Prototype",
    image: project2,
    description:
      "A dynamic and interactive data presentation tool prototype, allowing for presenters to meaningfully engage with their audience in corporate environments.",
    technologies: ["Figma", "Data Visualizations"],
    link: [
      "https://www.figma.com/proto/uAX2XBm23bgWtj3vtC1crt/A3-Stage-3-Wireframe-(Copy)?type=design&node-id=257-1962&t=N4T4AH2L0DR8I7BV-0&scaling=min-zoom&page-id=257%3A1922&starting-point-node-id=257%3A1962",
    ],
  },
  {
    title: "Saturday Night Live Exploratory Data Analysis (EDA)",
    image: project3,
    description:
      "A Python program to web scrape and analyze IMDb data for over 900 SNL episodes, identifying that favored hosts, especially comedians and actors, often returned for multiple episodes.",
    technologies: ["Python", "Web Scraping", "Git"],
    link: [
      "https://github.com/shoepack/SNL-Data-Analysis/blob/master/SNL-Analysis.ipynb",
    ],
  },
  {
    title: "Portfolio Website",
    image: project4,
    description:
      "A responsive portfolio site showcasing projects, skills, and contact info. Hosted on a custom domain using Vercel.",
    technologies: ["HTML", "React", "Tailwind", "Node.js"],
    link: ["https://jasonartley.com/"],
  },
];

export const CONTACT = {
  address: "Oceanside, CA - 92058 ",
  phoneNo: "(619) 630-4396",
  email: "contact@jasonartley.com",
};
