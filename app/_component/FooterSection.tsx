import React from "react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { name , email, number, github, linkedin, whatsapp} from "../data";

export default function FooterSection() {
  return (
    <div id="contact" className="bg-[#303249] text-white pt-16 pb-6 px-10">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        <div>
          <h1 className="text-3xl font-bold text-[#26CCBB]">{name}</h1>
          <p className="text-gray-300 mt-3 w-[90%] leading-relaxed">
            MERN Stack Developer crafting modern, high-performance, user-focused digital experiences.  
            Let&apos;s connect and build something amazing together.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-[#26CCBB]">Quick Links</h2>
          <ul className="hidden md:flex gap-8 text-sm">
                <li><a href="#about" className="hover:text-[#26CCBB] transition">About</a></li>
                <li><a href="#technology" className="hover:text-[#26CCBB] transition">Skills</a></li>
                <li><a href="#projects" className="hover:text-[#26CCBB] transition">Projects</a></li>
                <li><a href="#contact" className="hover:text-[#26CCBB] transition">Contact</a></li>
           </ul>

        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3 text-[#26CCBB]">Connect With Me</h2>

          <div className="space-y-2 text-gray-300">
            <p className="flex items-center gap-2">
              <MdEmail className="text-[#26CCBB] text-xl" /> 
              {email}
            </p>

            <p className="flex items-center gap-2">
              <FaWhatsapp className="text-[#26CCBB] text-xl" /> 
              +{number}
            </p>
          </div>

          <div className="flex gap-4 mt-5">
            <a href={github} target="_blank" className="text-2xl hover:text-[#26CCBB] transition-all"><FaGithub /></a>
            <a href={linkedin} target="_blank" className="text-2xl hover:text-[#26CCBB] transition-all"><FaLinkedin /></a>
            {/* <a href="#" className="text-2xl hover:text-[#26CCBB] transition-all"><FaFacebook /></a> */}
            <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-[#26CCBB] transition-all"><FaWhatsapp /></a>
          </div>
        </div>

      </div>

      <div className="mt-14 border-t border-gray-700 pt-5 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} {name}. All Rights Reserved.
      </div>
    </div>
  );
}
