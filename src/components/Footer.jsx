export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-black text-white border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <h4 className="text-lg font-semibold">Team</h4>
          <p className="text-white/70 mt-2 max-w-md">We connect ambitious companies with exceptional talent. Tell us who you’re looking for and we’ll curate a shortlist in hours, not weeks.</p>
        </div>
        <div className="sm:justify-self-end">
          <p className="text-white/70">Get in touch</p>
          <a href="mailto:hello@example.com" className="text-white font-medium underline">hello@example.com</a>
          <p className="text-xs text-white/50 mt-6">© {new Date().getFullYear()} Team. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
