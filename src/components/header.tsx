import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b py-4">
      <div className="flex justify-between max-w-7xl mx-auto px-6">
        <div className="flex gap-8">
          <Link href="/" className="text-lg">
            Reach
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-slate-500 text-sm">
            <Link href="/about">About</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>

        <nav className="flex gap-4 text-sm text-slate-500">
          <Link href="/sign-in">Sign In</Link>
          <Link href="/sign-up">Sign Up</Link>
        </nav>
      </div>
    </header>
  );
}
