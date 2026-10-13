interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

export default function AuthLayout({
  children,
  title,
  description,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-zinc-950 selection:bg-emerald-500/30 flex flex-col font-sans relative overflow-hidden items-center justify-center p-6">
      {/* Background ambient light */}
      <div className="absolute top-0 inset-x-0 h-125 bg-linear-to-b from-emerald-500/10 via-emerald-500/5 to-transparent pointer-events-none" />

      <main className="w-full max-w-md z-10 relative">
        <div className="mb-8 text-center">
          <h1 className="leading-none text-3xl tracking-tighter text-center font-mono">
            <strong className="font-bold">
              bid<span className="text-emerald-400">wise</span>
            </strong>
          </h1>

          <h2 className="text-3xl font-semibold tracking-tight text-zinc-100 my-2">
            {title}
          </h2>
          <p className="text-zinc-400 text-sm leading-relaxed">{description}</p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl p-6 md:p-8 shadow-2xl relative">
          {children}
        </div>
      </main>
    </div>
  );
}
