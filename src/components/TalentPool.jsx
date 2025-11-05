import { useMemo, useState } from "react";
import Modal from "./Modal";

const AVATARS = [
  "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=200&auto=format&fit=crop",
];

const ROLES = [
  "Product Designer",
  "Frontend Engineer",
  "Backend Engineer",
  "Full‑stack Developer",
  "AI/ML Engineer",
  "Product Manager",
  "Brand Designer",
  "Data Engineer",
];

function makeTalent(seed) {
  const id = crypto.randomUUID();
  return {
    id,
    name: `Alex ${seed}`,
    role: ROLES[seed % ROLES.length],
    avatar: AVATARS[seed % AVATARS.length],
    location: ["Remote", "Hybrid", "On‑site"][seed % 3],
    seniority: ["Senior", "Mid", "Lead"][seed % 3],
  };
}

export default function TalentPool() {
  const initial = useMemo(() => Array.from({ length: 12 }, (_, i) => makeTalent(i + 1)), []);
  const [available, setAvailable] = useState(initial);
  const [selected, setSelected] = useState([]);
  const [dragId, setDragId] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const hasSelected = selected.length > 0;

  const onDragStart = (e, id) => {
    setDragId(id);
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDropToSelected = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") || dragId;
    if (!id) return;
    const t = available.find((x) => x.id === id);
    if (!t) return;
    setAvailable((prev) => prev.filter((x) => x.id !== id));
    setSelected((prev) => [...prev, t]);
    setDragId(null);
  };

  const onDropToAvailable = (e) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain") || dragId;
    if (!id) return;
    const t = selected.find((x) => x.id === id);
    if (!t) return;
    setSelected((prev) => prev.filter((x) => x.id !== id));
    setAvailable((prev) => [...prev, t]);
    setDragId(null);
  };

  const onDragOver = (e) => e.preventDefault();

  const handleOpenModal = () => setOpen(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      email: String(form.get("email") || ""),
      company: String(form.get("company") || ""),
      details: String(form.get("details") || ""),
      talents: selected,
      to: "danysarwar@gmail.com",
    };
    try {
      setLoading(true);
      const base = import.meta.env.VITE_BACKEND_URL || "";
      const res = await fetch(`${base}/api/talent-request`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setOpen(false);
      alert("Thanks! We’ve received your request.");
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="talent" className="relative w-full bg-black text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Talent Pool</h2>
            <p className="text-white/70 mt-2">Drag and drop candidates into your shortlist.</p>
          </div>
          {hasSelected && (
            <button onClick={handleOpenModal} className="px-5 py-2 rounded-md bg-white text-black font-medium shadow">
              Add to your team
            </button>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Available */}
          <div
            onDragOver={onDragOver}
            onDrop={onDropToAvailable}
            className="rounded-xl border border-white/10 bg-neutral-950 p-4 min-h-[420px]"
          >
            <h3 className="text-sm font-medium text-white/70 mb-3">Available</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {available.map((t) => (
                <div
                  key={t.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, t.id)}
                  className="group cursor-grab active:cursor-grabbing select-none p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition"
                >
                  <div className="flex items-center gap-3">
                    <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                    <div className="min-w-0">
                      <p className="font-medium truncate">{t.name}</p>
                      <p className="text-xs text-white/60 truncate">{t.role}</p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
                    <span className="px-2 py-1 rounded bg-white/5 border border-white/10">{t.seniority}</span>
                    <span className="px-2 py-1 rounded bg-white/5 border border-white/10">{t.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected */}
          <div
            onDragOver={onDragOver}
            onDrop={onDropToSelected}
            className="rounded-xl border border-white/10 bg-neutral-950 p-4 min-h-[420px]"
          >
            <h3 className="text-sm font-medium text-white/70 mb-3">Your shortlist</h3>
            {selected.length === 0 ? (
              <div className="h-[360px] rounded-lg border border-dashed border-white/15 grid place-items-center text-white/50">
                Drop candidates here
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selected.map((t) => (
                  <div
                    key={t.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, t.id)}
                    className="group cursor-grab active:cursor-grabbing select-none p-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition"
                  >
                    <div className="flex items-center gap-3">
                      <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                      <div className="min-w-0">
                        <p className="font-medium truncate">{t.name}</p>
                        <p className="text-xs text-white/60 truncate">{t.role}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-xs text-white/60">
                      <span className="px-2 py-1 rounded bg-white/5 border border-white/10">{t.seniority}</span>
                      <span className="px-2 py-1 rounded bg-white/5 border border-white/10">{t.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} talents={selected} onSubmit={handleSubmit} loading={loading} />
    </section>
  );
}
