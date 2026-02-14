export default function Footer() {
  return (
    <footer className="hidden lg:flex pt-8 pb-4 items-center justify-between text-[11px] text-slate-400 font-medium border-t border-slate-100">
      <p>@2026 CLINICARE Medical SaaS. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-slate-600">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-slate-600">
          Terms of Service
        </a>
        <a href="#" className="hover:text-slate-600">
          Help Center
        </a>
      </div>
    </footer>
  );
}
