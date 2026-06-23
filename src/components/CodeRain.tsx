'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

const codeLinesLeft = [
  'function hello() {',
  '  return "world";',
  '}',
  'const data = await fetch(url)',
  'useEffect(() => {',
  '  console.log("mounted")',
  '}, [])',
  'import { useState } from "react"',
  'export default function App() {',
  'class User {',
  '  constructor(name: string) {',
  '    this.name = name',
  '  }',
  '}',
  'npm install',
  'git push origin main',
  'const [state, setState] = useState()',
  '<div className="hero">',
  'return <Component />',
  'try {',
  '  await doSomething()',
  '} catch (err) {',
  '  console.error(err)',
  '}',
  'type Props = {',
  '  children: React.ReactNode',
  '}',
  'const router = useRouter()',
  'prisma.user.findMany()',
  'z.object({ name: z.string() })',
];

const codeLinesRight = [
  'git init',
  'git commit -m "first commit"',
  'docker build -t app .',
  'docker run -p 3000:3000 app',
  'SELECT * FROM users',
  'WHERE active = true',
  'ORDER BY created_at DESC',
  'CREATE TABLE posts (',
  '  id SERIAL PRIMARY KEY,',
  '  title VARCHAR(255)',
  ')',
  'ssh user@server.com',
  'curl -X POST /api/data',
  'grep -r "TODO" ./src',
  'chmod +x deploy.sh',
  './deploy.sh --prod',
  'pip install -r requirements.txt',
  'python manage.py migrate',
  'cargo build --release',
  'kubectl apply -f k8s/',
  'terraform plan',
  'terraform apply',
  'jest --coverage',
  'eslint . --fix',
  'prettier --write "**/*.ts"',
  'cat /var/log/nginx/error.log',
  'systemctl restart nginx',
  'pm2 start ecosystem.config.js',
];

function useTypingColumn(
  active: boolean,
  lines: string[],
  onDone: () => void,
  resetSignal: number,
) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lineIndexRef = useRef(0);
  const charIndexRef = useRef(0);
  const displayedLinesRef = useRef<string[]>([]);
  const currentLineRef = useRef('');
  const activeRef = useRef(false);
  const doneRef = useRef(false);

  const flush = useCallback(() => {
    if (!canvasRef.current) return;
    const html = displayedLinesRef.current
      .map(l => `<div class="cr-line">${escapeHtml(l)}</div>`)
      .join('');
    const cursor = activeRef.current && !doneRef.current
      ? `<div class="cr-line cr-current">${escapeHtml(currentLineRef.current)}<span class="cr-cursor"></span></div>`
      : currentLineRef.current
        ? `<div class="cr-line cr-current">${escapeHtml(currentLineRef.current)}</div>`
        : '';
    canvasRef.current.innerHTML = html + cursor;
  }, []);

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTyping = useCallback(() => {
    stopInterval();
    doneRef.current = false;
    intervalRef.current = setInterval(() => {
      if (!activeRef.current) return;
      if (lineIndexRef.current >= lines.length) {
        stopInterval();
        doneRef.current = true;
        onDone();
        return;
      }
      const line = lines[lineIndexRef.current];
      if (charIndexRef.current < line.length) {
        currentLineRef.current = line.slice(0, charIndexRef.current + 1);
        charIndexRef.current++;
      } else {
        displayedLinesRef.current = [...displayedLinesRef.current, line];
        currentLineRef.current = '';
        lineIndexRef.current++;
        charIndexRef.current = 0;
      }
      flush();
    }, 28);
  }, [stopInterval, flush, lines, onDone]);

  // Resetear y arrancar cuando cambia resetSignal
  useEffect(() => {
    displayedLinesRef.current = [];
    currentLineRef.current = '';
    lineIndexRef.current = 0;
    charIndexRef.current = 0;
    doneRef.current = false;
    flush();
    if (activeRef.current) startTyping();
  }, [resetSignal, flush, startTyping]);

  // Activar / pausar
  useEffect(() => {
    activeRef.current = active;
    if (active && !doneRef.current) {
      startTyping();
    } else {
      stopInterval();
      flush();
    }
  }, [active, startTyping, stopInterval, flush]);

  useEffect(() => {
    return () => stopInterval();
  }, [stopInterval]);

  return canvasRef;
}

export default function CodeRain() {
  const [active, setActive] = useState(false);
  const activeRef = useRef(false);
  const overCardRef = useRef(false);

  // resetSignal: cuando sube, ambas columnas se reinician juntas
  const [resetSignal, setResetSignal] = useState(0);
  const doneCountRef = useRef(0);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onColumnDone = useCallback(() => {
    doneCountRef.current += 1;
    // Cuando las DOS terminaron, esperar 1s y reiniciar juntas
    if (doneCountRef.current >= 2) {
      doneCountRef.current = 0;
      restartTimerRef.current = setTimeout(() => {
        if (activeRef.current) {
          setResetSignal(s => s + 1);
        }
      }, 1000);
    }
  }, []);

  const leftRef = useTypingColumn(active, codeLinesLeft, onColumnDone, resetSignal);
  const rightRef = useTypingColumn(active, codeLinesRight, onColumnDone, resetSignal);

  const activate = useCallback(() => {
    if (activeRef.current) return;
    activeRef.current = true;
    setActive(true);
  }, []);

  const deactivate = useCallback(() => {
    if (!activeRef.current) return;
    activeRef.current = false;
    setActive(false);
    if (restartTimerRef.current) {
      clearTimeout(restartTimerRef.current);
      restartTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    const onMouseMove = () => {
      if (!overCardRef.current) activate();
    };
    const onMouseLeave = () => deactivate();
    const onCardEnter = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      if (target?.closest('[data-card]')) {
        overCardRef.current = true;
        deactivate();
      }
    };
    const onCardLeave = (e: MouseEvent) => {
      const related = e.relatedTarget instanceof Element ? e.relatedTarget : null;
      if (!related?.closest('[data-card]')) overCardRef.current = false;
    };

    window.addEventListener('mousemove', onMouseMove);
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onCardEnter, true);
    document.addEventListener('mouseleave', onCardLeave, true);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onCardEnter, true);
      document.removeEventListener('mouseleave', onCardLeave, true);
      if (restartTimerRef.current) clearTimeout(restartTimerRef.current);
    };
  }, [activate, deactivate]);

  return (
    <>
      <style>{`
        .cr-line {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 13px;
          line-height: 1.7;
          color: rgba(0, 0, 0, 0.3);
          white-space: pre;
        }
        .cr-current { display: flex; align-items: center; }
        .cr-cursor {
          display: inline-block;
          width: 7px;
          height: 15px;
          background: rgba(0, 0, 0, 0.2);
          margin-left: 1px;
          animation: cr-blink 1s step-end infinite;
        }
        @keyframes cr-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>

      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        userSelect: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        padding: '32px',
      }}>
        <div ref={leftRef} style={{ width: '220px' }} />
        <div ref={rightRef} style={{ width: '220px' }} />
      </div>
    </>
  );
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/ /g, '&nbsp;');
}