export default function Footer() {
  return (
    <footer className="border-t border-slate-800 mt-8">
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <span>© {new Date().getFullYear()} Thomas T. Tang III</span>
        <div className="flex gap-6">
          <a
            href="mailto:Tang.T.Thomas@gmail.com"
            className="hover:text-cyan-400 transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
