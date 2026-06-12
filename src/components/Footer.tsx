export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-400 text-sm">
            © {new Date().getFullYear()} Maxlias Dev Space
          </p>
          
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-400 hover:text-blue-500 transition">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}