import { useState, useEffect } from 'react';

interface TerminalMockupProps {
  commands?: Array<{ 
    prompt?: string; 
    output?: string | string[];
    ascii?: string[];
    info?: Array<{label: string, value: string, isHeader?: boolean, isSeparator?: boolean}>;
  }>;
  className?: string;
}

const defaultCommands = [
  {
    prompt: 'neofetch',
    ascii: [
      '                   -`',
      '                  .o+`',
      '                 `ooo/',
      '                `+oooo:',
      '               `+oooooo:',
      '               -+oooooo+:',
      '             `/:-:++oooo+:',
      '            `/++++/+++++++:',
      '           `/++++++++++++++:',
      '          `/+++ooooooooooooo/`',
      '         ./ooosssso++osssssso+`',
      '        .oossssso-````/ossssss+`',
      '       -osssssso.      :ssssssso.',
      '      :osssssss/        osssso+++.',
      '     /ossssssss/        +ssssooo/-',
      '   `/ossssso+/:-        -:/+osssso+-',
      '  `+sso+:-`                 `.-/+oso:',
      ' `++:.                           `-/+/',
      ' .`                                 `/'
    ],
    info: [
      { label: 'imphnen@imphnenos', value: '', isHeader: true },
      { label: '------------------', value: '', isSeparator: true },
      { label: 'OS', value: 'ImphnenOS x86_64' },
      { label: 'Host', value: 'Programmer Handal Machine' },
      { label: 'Kernel', value: '6.8.0-imphnen-custom' },
      { label: 'Uptime', value: '24/7' },
      { label: 'Packages', value: '2048 (pacman)' },
      { label: 'Shell', value: 'bash 5.2.21' },
      { label: 'Resolution', value: '1920x1080' },
      { label: 'WM', value: 'mango' },
      { label: 'Theme', value: 'Imphnen-Dark' },
      { label: 'Icons', value: 'Imphnen-Icons' },
      { label: 'Terminal', value: 'alacritty' },
      { label: 'CPU', value: 'Developer Mind (12) @ 4.5GHz' },
      { label: 'Memory', value: '16000MiB / 32000MiB' }
    ]
  }
];

export default function TerminalMockup({ commands = defaultCommands, className = '' }: TerminalMockupProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typedChars, setTypedChars] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= commands.length) return;

    const currentCommand = commands[currentLineIndex];
    if (!currentCommand.prompt) {
      setIsTyping(false);
      return;
    }

    if (typedChars.length < currentCommand.prompt.length) {
      const timeout = setTimeout(() => {
        setTypedChars(currentCommand.prompt!.slice(0, typedChars.length + 1));
      }, 50 + Math.random() * 50);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [typedChars, currentLineIndex, commands]);

  useEffect(() => {
    if (!isTyping && currentLineIndex < commands.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setTypedChars('');
        setIsTyping(true);
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [isTyping, currentLineIndex, commands.length]);

  return (
    <div className={`rounded-xl overflow-hidden shadow-2xl bg-[#0f172a] border border-[#1e293b] font-mono text-xs md:text-sm flex flex-col ${className}`}>
      {/* Title bar */}
      <div className="flex items-center px-4 py-3 bg-[#1e293b] border-b border-[#334155] shrink-0">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
          <div className="w-3 h-3 rounded-full bg-[#eab308]" />
          <div className="w-3 h-3 rounded-full bg-[#22c55e]" />
        </div>
        <div className="flex-1 text-center text-xs text-[#94a3b8] font-medium tracking-wider">
          imphnen@imphnenos:~
        </div>
      </div>

      {/* Terminal content */}
      <div className="p-4 flex-1 overflow-auto text-left whitespace-pre">
        {commands.slice(0, currentLineIndex + 1).map((cmd, i) => {
          const isCurrentCmd = i === currentLineIndex;
          const showOutput = !isCurrentCmd || !isTyping;
          
          return (
            <div key={i} className="mb-4 last:mb-0">
              {cmd.prompt && (
                <div className="flex items-start text-emerald-400">
                  <span className="mr-2">➜</span>
                  <span className="text-blue-400 mr-2">~</span>
                  <span className="text-gray-100">
                    {isCurrentCmd ? typedChars : cmd.prompt}
                    {isCurrentCmd && isTyping && (
                      <span className="animate-[blink_1s_step-end_infinite] border-r-2 border-gray-400 ml-1" />
                    )}
                  </span>
                </div>
              )}
              {showOutput && (
                <div className="text-cyan-300 mt-1 pl-6">
                  {cmd.output && (
                    Array.isArray(cmd.output) ? (
                      cmd.output.map((line, j) => (
                        <div key={j}>{line}</div>
                      ))
                    ) : (
                      <div>{cmd.output}</div>
                    )
                  )}
                  {cmd.ascii && cmd.info && (
                    <div className="flex gap-4 md:gap-8 mt-2">
                      <div className="text-cyan-400">
                        {cmd.ascii.map((line, j) => (
                          <div key={j}>{line}</div>
                        ))}
                      </div>
                      <div className="text-gray-300">
                        {cmd.info.map((info, j) => {
                          if (info.isHeader) return <div key={j} className="text-cyan-300">{info.label}</div>;
                          if (info.isSeparator) return <div key={j}>{info.label}</div>;
                          return (
                            <div key={j}>
                              <span className="text-cyan-300">{info.label}:</span> {info.value}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {currentLineIndex === commands.length - 1 && !isTyping && (
           <div className="flex items-start text-emerald-400 mt-4">
             <span className="mr-2">➜</span>
             <span className="text-blue-400 mr-2">~</span>
             <span className="animate-[blink_1s_step-end_infinite] border-r-2 border-gray-400 ml-1" />
           </div>
        )}
      </div>
    </div>
  );
}
