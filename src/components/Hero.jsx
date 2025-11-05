import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] w-full bg-black text-white overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/a6HhFsV3-DN9Z-yP/scene.splinecode" style={{ width: '100%', height: '100%' }} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black" />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 pt-28 pb-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">Build your dream team with world‑class talent</h1>
          <p className="mt-4 text-white/80 text-lg">A curated network of designers, engineers and operators available on demand. Drag candidates into your shortlist and we’ll handle the rest.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="#talent" className="px-6 py-3 rounded-md bg-white text-black font-medium w-fit">Explore Talent</a>
            <a href="#contact" className="px-6 py-3 rounded-md border border-white/20 text-white font-medium w-fit">Talk to us</a>
          </div>
        </div>
      </div>
    </section>
  );
}
