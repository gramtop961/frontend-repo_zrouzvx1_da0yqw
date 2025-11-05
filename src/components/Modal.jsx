import { X } from "lucide-react";

export default function Modal({ open, onClose, talents, onSubmit, loading }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-2xl mx-auto bg-neutral-950 border border-white/10 rounded-xl p-6 text-white shadow-2xl">
        <button onClick={onClose} className="absolute right-3 top-3 p-2 text-white/70 hover:text-white"><X size={18} /></button>
        <h3 className="text-xl font-semibold">Add to your team</h3>
        <p className="text-white/70 text-sm mt-1">You’re about to reach out about the following talent:</p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {talents.map((t) => (
            <div key={t.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-xs text-white/60">{t.role}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <label className="text-sm text-white/70">Your email</label>
              <input required type="email" name="email" placeholder="you@company.com" className="px-3 py-2 rounded-md bg-black border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/20" />
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-white/70">Company</label>
              <input type="text" name="company" placeholder="Acme Inc." className="px-3 py-2 rounded-md bg-black border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/20" />
            </div>
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-white/70">More details</label>
            <textarea name="details" rows={4} placeholder="Tell us about the roles, seniority, timeline, etc." className="px-3 py-2 rounded-md bg-black border border-white/15 focus:outline-none focus:ring-2 focus:ring-white/20" />
          </div>
          <button disabled={loading} className="px-5 py-3 rounded-md bg-white text-black font-medium disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Sending…' : 'Send request'}
          </button>
        </form>
      </div>
    </div>
  );
}
