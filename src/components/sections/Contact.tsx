import { ArrowRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { MorphingWord } from "@/components/visuals/MorphingWord";

export const Contact = () => {
  return (
    <div className="text-center relative z-10">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight flex items-center justify-center gap-2">
        Ready to build the <MorphingWord className="text-cyan-400 min-w-[120px]" />?
      </h2>
      <p className="text-lg text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed">
        Whether you have a question about distributed systems, want to collaborate on an open-source project, or just want to say
        hi, my inbox is always open.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
        <a
          href="mailto:hi@lunchb0ne.me"
          className="group flex items-center gap-3 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-cyan-400 transition-colors duration-300"
        >
          <Mail className="w-5 h-5" />
          <span>Say Hello</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      <div className="flex justify-center gap-8">
        <a
          href="https://github.com/lunchb0ne"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-white hover:scale-110 transition-all duration-300"
        >
          <Github className="w-6 h-6" />
          <span className="sr-only">GitHub</span>
        </a>
        <a
          href="https://linkedin.com/in/abhishek-aryan" // Assuming handle
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-[#0077b5] hover:scale-110 transition-all duration-300"
        >
          <Linkedin className="w-6 h-6" />
          <span className="sr-only">LinkedIn</span>
        </a>
        <a
          href="https://twitter.com/lunchb0ne" // Assuming handle
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/40 hover:text-[#1DA1F2] hover:scale-110 transition-all duration-300"
        >
          <Twitter className="w-6 h-6" />
          <span className="sr-only">Twitter</span>
        </a>
      </div>

      <div className="mt-20 text-center text-white/20 text-sm font-mono">
        &copy; {new Date().getFullYear()} Abhishek Aryan. All rights reserved.
      </div>
    </div>
  );
};
