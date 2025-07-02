import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
        {/* Left - Brand Info */}
        <div>
          <h2 className="text-2xl font-bold">StudyFlow</h2>
          <p className="text-gray-400 mt-2 max-w-xs">
            Empowering students to stay organized, motivated, and ahead with AI-driven progress tracking.
          </p>
        </div>

        {/* Center - Navigation */}
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-lg mb-1">Quick Links</h3>
          <a href="#" className="text-gray-400 hover:text-white">Home</a>
          <a href="#" className="text-gray-400 hover:text-white">Features</a>
          <a href="#" className="text-gray-400 hover:text-white">Dashboard</a>
          <a href="#" className="text-gray-400 hover:text-white">Get Started</a>
        </div>

        {/* Right - Socials */}
        <div>
          <h3 className="font-semibold text-lg mb-2">Connect with Us</h3>
          <div className="flex gap-4">
            <a href="#" aria-label="GitHub"><Github className="text-gray-400 hover:text-white" /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin className="text-gray-400 hover:text-white" /></a>
            <a href="#" aria-label="Twitter"><Twitter className="text-gray-400 hover:text-white" /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-10 text-sm border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} StudyFlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
