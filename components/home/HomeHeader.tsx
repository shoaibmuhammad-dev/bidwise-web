import Logo from "../common/Logo";
import Animate from "../common/Animate";

export default function HomeHeader() {
  return (
    <Animate y={20}>
      <div className="mb-10">
        <Logo />

        <div className="text-[14px] font-mono tracking-widest text-emerald-400/80 uppercase mb-4 flex items-center gap-2 mt-6">
          <span>Paste any job post</span>
          <span className="w-1 h-1 bg-zinc-700 rounded-full" />
          <span>Built for freelancers</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-100 mb-4">
          Should you bid on this job?
        </h2>

        <p className="text-zinc-400 text-lg md:text-lg max-w-xl leading-[1.35]">
          Paste a job post to see how much AI can do for you, what it does to
          your hourly rate, and what to bid.
        </p>
      </div>
    </Animate>
  );
}
