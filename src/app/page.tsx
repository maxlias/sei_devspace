import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-[#2d3b4e] rounded-2xl p-8 md:p-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Hi! I'm Maxlias
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-400 mb-6">
            Building and sharing, one commit at a time
          </p>
          
          <div className="space-y-4 text-gray-300 mb-8">
            <p>
              Full Stack developer exploring the intersection of creativity and technology. 
              Open source advocate, Linux user, and lifelong learner. 
              I believe the best code is written together.
              This is my little corner of the internet. A place to share my journey.
            </p>
          </div>
          
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
            About me
          </button>
        </div>
      </div>

      {/* Sección My Projects - esto es beta, despues remplazar con el repo de git */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-white whitespace-nowrap">My Projects</h2>
          <div className="flex-1 h-px bg-gray-600"></div>
        </div>
        
        <div className="space-y-4">
          {/* Proyecto 1 */}
          <div className="bg-[#2d3b4e] rounded-xl p-5">
            <h3 className="text-xl font-semibold text-white">Nombre del Proyecto</h3>
            <p className="text-gray-400 text-sm mt-1">Descripción del proyecto. Qué hace, tecnologías usadas.</p>
            <div className="flex gap-3 mt-3">
              <span className="text-xs text-blue-400">React</span>
              <span className="text-xs text-blue-400">TypeScript</span>
            </div>
          </div>

          {/* Proyecto 2 */}
          <div className="bg-[#2d3b4e] rounded-xl p-5">
            <h3 className="text-xl font-semibold text-white">Otro Proyecto</h3>
            <p className="text-gray-400 text-sm mt-1">Descripción de este otro proyecto.</p>
            <div className="flex gap-3 mt-3">
              <span className="text-xs text-blue-400">Next.js</span>
              <span className="text-xs text-blue-400">Tailwind</span>
            </div>
          </div>
        </div>
      </div>
      </main>
      <Footer />
    </div>
  );
}