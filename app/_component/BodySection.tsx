import React from "react";
import { FaHtml5, FaReact, FaJsSquare, FaDatabase, FaDocker } from "react-icons/fa";
import { TbHexagonLetterE } from "react-icons/tb";
import { DiNodejs, DiRedis } from "react-icons/di";
import { RiNextjsFill } from "react-icons/ri";
import { projects , about , extraActivityAbout } from "../data";

export default function BodySection() {
  const technologies = [
    { name: "HTML5 & CSS", icon: <FaHtml5 /> },
    { name: "JavaScript", icon: <FaJsSquare /> },
    { name: "React JS", icon: <FaReact /> },
    { name: "Next JS", icon: <RiNextjsFill /> },
    { name: "Express.js", icon: <TbHexagonLetterE /> },
    { name: "Node.js", icon: <DiNodejs /> },
    { name: "MongoDB & SQL", icon: <FaDatabase /> },
    { name: "Redis", icon: <DiRedis /> },
    { name: "Docker", icon: <FaDocker /> },
  ];

  return (
    <>
      
      <div className="bg-[#1C1C2D] flex flex-col md:flex-row py-20 px-10" id="about">

        <div className="flex w-full md:w-1/2 justify-center items-end pb-10 md:pb-0">
          <img src="IMG-20251023-WA0029.jpg" alt="Profile" className="size-80 md:size-96 object-cover rounded-xl" />
        </div>

        <div className="w-full md:w-1/2 text-white px-5">
          <div className="flex gap-2 items-end mb-4">
            <h1 className="text-[#26CCBB] text-4xl font-bold">About</h1>
            <h1 className="text-4xl font-bold">Me</h1>
          </div>

          <div className="text-lg leading-relaxed space-y-4 w-[95%]">
            <p>
              {about}
            </p>
            <p>
              {extraActivityAbout}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-[#303249] text-white py-16 px-10" id="technology">
        <div className="w-full flex justify-center">
          <h1 className="text-4xl font-bold">Core Technologies</h1>
        </div>

        <div className="w-full flex justify-center mt-3">
          <p className="text-gray-300 text-center w-[60%]">
            A selection of my favorite tools and technologies that I use to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10 px-10">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 bg-[#1C1C2D] p-6 rounded-xl 
              hover:scale-105 transition-all hover:shadow-xl hover:shadow-[#26CCBB]/40 cursor-pointer"
            >
              <div className="text-5xl text-[#26CCBB]">{tech.icon}</div>
              <p className="text-white font-medium">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>


      <div className="bg-[#1C1C2D] text-white py-16 px-10" id="projects">
        <div className="w-full flex justify-center">
          <h1 className="text-4xl font-bold">Featured Projects</h1>
        </div>

        <div className="w-full flex justify-center mt-3">
          <p className="text-gray-300 text-center w-[60%]">
            Here are some of the projects I'm proud of. Each one represents a challenge I was excited to tackle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 px-5 md:px-20">
            {projects.map((proj, index) => (
                <div
                key={index}
                className="bg-[#303249] rounded-xl overflow-hidden hover:scale-105 transition-all hover:shadow-xl hover:shadow-[#26CCBB]/40"
                >
                <img src={proj.img} alt="Project" className="w-full h-48 object-cover" />

                <div className="p-5">
                    <h2 className="text-2xl font-bold">{proj.title}</h2>
                    <p className="text-gray-300 mt-2">{proj.desc}</p>

                    <div className="flex flex-wrap gap-2 mt-4">
                    {proj.tags.map((tag, tagIndex) => (
                        <span
                        key={tagIndex}
                        className="px-3 py-1 text-sm bg-[#1C1C2D] border border-[#26CCBB] rounded-full text-[#26CCBB]"
                        >
                        {tag}
                        </span>
                    ))}
                    </div>

                    <button className="mt-5 px-6 py-2 bg-[#26CCBB] text-black font-semibold rounded-full hover:scale-105 transition-all">
                    View Project
                    </button>
                </div>
                </div>
            ))}
            </div>

      </div>

      <div>

      </div>
    </>
  );
}
