import { Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="w-full sticky top-0 z-50 bg-black/60 backdrop-blur supports-[backdrop-filter]:bg-black/40 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" />
          <span className="text-white font-semibold tracking-tight">Team</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
          <a className="hover:text-white transition" href="#talent">Talent</a>
          <a className="hover:text-white transition" href="#about">About</a>
          <a className="hover:text-white transition" href="#contact">Contact</a>
          <a className="px-4 py-2 rounded-md bg-white text-black font-medium hover:bg-white/90 transition" href="#talent">Hire Talent</a>
        </nav>
        <button aria-label="menu" onClick={() => setOpen(!open)} className="md:hidden text-white/80"><Menu /></button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3 text-white/80">
            <a className="hover:text-white transition" href="#talent">Talent</a>
            <a className="hover:text-white transition" href="#about">About</a>
            <a className="hover:text-white transition" href="#contact">Contact</a>
            <a className="px-4 py-2 rounded-md bg-white text-black font-medium w-fit" href="#talent">Hire Talent</a>
          </div>
        </div>
      )}
    </header>
  );
}
