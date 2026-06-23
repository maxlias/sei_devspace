'use client';

import dynamic from 'next/dynamic';

const CodeRain = dynamic(() => import('./CodeRain'), { ssr: false });

export default function CodeRainWrapper() {
  return <CodeRain />;
}