import React from "react";

export const Footer = () => (
  <footer className="w-full max-w-2xl mx-auto px-6 pb-28">
    <div className="pt-12 flex flex-col items-center gap-6 border-t border-(--border-color)">
      <div className="flex gap-6 text-xs text-(--text-muted)">
        <a href="mailto:nagmani@gmail.com" className="hover:text-(--text-primary) transition-colors">Email</a>
        <a href="https://x.com/nagmani" target="_blank" rel="noopener noreferrer" className="hover:text-(--text-primary) transition-colors">Twitter</a>
        <a href="https://github.com/Nagmani" target="_blank" rel="noopener noreferrer" className="hover:text-(--text-primary) transition-colors">GitHub</a>
        <a href="https://www.linkedin.com/in/manu-sharma-6012bb32a/" target="_blank" rel="noopener noreferrer" className="hover:text-(--text-primary) transition-colors">LinkedIn</a>
        <a href="https://discord.com/users/762906412564217857" target="_blank" rel="noopener noreferrer" className="hover:text-(--text-primary) transition-colors">Discord</a>
      </div>
      <div className="flex flex-col items-center text-[11px] text-(--text-muted) gap-1">
        <span className="flex items-center gap-1">
          Design & Developed by{" "}
          <span className="font-medium text-(--text-primary)">Nagmani Upadhyay</span>
        </span>
        <span className="opacity-60">© {new Date().getFullYear()}. All rights reserved.</span>
      </div>
    </div>
  </footer>
);
