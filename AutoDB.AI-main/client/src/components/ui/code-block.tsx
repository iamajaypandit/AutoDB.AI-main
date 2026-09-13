import React, { useState } from 'react';
import { Clipboard, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export function CodeBlock({
  code,
  language = 'sql',
  showLineNumbers = true,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  // Split code into lines for line numbering
  const codeLines = code.split('\n');

  return (
    <div className={cn('relative group font-mono text-sm rounded-md overflow-hidden', className)}>
      <div className="absolute right-2 top-2 z-10">
        <button
          onClick={copyToClipboard}
          className="p-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white transition-colors"
          aria-label="Copy code"
        >
          {copied ? <Check size={16} /> : <Clipboard size={16} />}
        </button>
      </div>
      <div className="overflow-auto p-4 bg-slate-900 text-slate-300 max-h-full">
        {showLineNumbers ? (
          <table className="border-collapse w-full">
            <tbody>
              {codeLines.map((line, i) => (
                <tr key={i} className="leading-relaxed">
                  <td className="text-right pr-4 select-none opacity-50 w-10 text-xs">
                    {i + 1}
                  </td>
                  <td className="whitespace-pre">
                    {line || ' '} {/* Empty lines need a space to maintain height */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <pre className="whitespace-pre-wrap break-words">{code}</pre>
        )}
      </div>
    </div>
  );
}
