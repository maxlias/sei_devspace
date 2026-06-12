'use client';

import { Code } from 'lucide-react';

const navItems = [
  { name: 'About', href: '#' },
  { name: 'Contact', href: '#' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-300 z-50">
      <nav className="w-full mx-auto px-0 sm:px-2 lg:px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Code className="w-7 h-7 text-blue-400" />
            <span className="font-bold text-2xl">
              Maxlias Dev
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-300 hover:text-blue-500 transition-colors"
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