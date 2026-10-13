import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-600 uppercase tracking-widest">
      <div>
        <Link href={"/"}>bidwise</Link> • beta
      </div>

      <div className="flex gap-6">
        <Link href="/" className="hover:text-zinc-400 transition-colors">
          Home
        </Link>

        <Link
          href="/contact-us"
          className="hover:text-zinc-400 transition-colors"
        >
          Contact
        </Link>
      </div>
    </footer>
  );
}
