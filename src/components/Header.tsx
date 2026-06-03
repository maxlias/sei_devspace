'use client';

import { Code } from 'lucide-react';

const navItems = [
  { name: 'About', href: '#' },
  { name: 'Contact', href: '#' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-[#2d3b4e] border-b border-[#3a4a62] z-50">
      <nav className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Code className="w-6 h-6 text-blue-400" />
            <span className="font-bold text-xl text-white">
              Maxlias Dev
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}