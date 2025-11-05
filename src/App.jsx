import Header from "./components/Header";
import Hero from "./components/Hero";
import TalentPool from "./components/TalentPool";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      <Hero />
      <main>
        <TalentPool />
        <section id="about" className="py-20">
          <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <h2 className="text-3xl font-bold">Why teams choose us</h2>
              <p className="text-white/70 mt-3 max-w-2xl">We curate a small, senior‑first network. Every candidate is vetted for craft, communication and reliability. Spin up a world‑class squad in days, not weeks.</p>
            </div>
            <ul className="grid gap-4">
              <li className="p-4 rounded-xl bg-white/5 border border-white/10">Vetted, senior talent only</li>
              <li className="p-4 rounded-xl bg-white/5 border border-white/10">Flexible, on‑demand engagements</li>
              <li className="p-4 rounded-xl bg-white/5 border border-white/10">Hands‑on support from our team</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
