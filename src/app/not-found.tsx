export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-[#0A0A0B] text-white p-8">
      <div className="text-center">
        <div className="text-[11px] tracking-[0.2em] text-white/40 font-mono">404 • NOT FOUND</div>
        <h1 className="text-3xl font-black mt-3">Page not found.</h1>
        <p className="text-sm text-white/50 mt-2">The page you requested does not exist.</p>
        <a href="/" className="inline-flex mt-6 bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold tracking-[0.14em]">GO HOME</a>
      </div>
    </div>
  );
}
