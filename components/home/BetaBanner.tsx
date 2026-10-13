export default function BetaBanner() {
  return (
    <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center">
      <div className="bg-orange-500/20 text-orange-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
        Beta
      </div>

      <p className="text-sm text-orange-200/80 leading-relaxed flex-1">
        bidwise is free while in beta — 3 analyses every 5 hours. We&apos;ll ask
        for quick feedback after each one to help us improve. Paid plans will
        come later — early users will be told first.
      </p>
    </div>
  );
}
