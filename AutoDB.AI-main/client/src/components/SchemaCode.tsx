import { useState } from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CodeIcon, RefreshCcw } from "lucide-react";

interface SchemaCodeProps {
  sqlCode: string;
  dbType: string;
  onChangeDbType: (dbType: string) => void;
  onUpdateCode?: () => void;
  isUpdatingCode?: boolean;
}

export default function SchemaCode({ 
  sqlCode, 
  dbType, 
  onChangeDbType, 
  onUpdateCode, 
  isUpdatingCode = false 
}: SchemaCodeProps) {
  const dbTypes = [
    { value: "mysql", label: "MySQL" },
    { value: "postgresql", label: "PostgreSQL" },
    { value: "sqlite", label: "SQLite" },
    { value: "mssql", label: "MS SQL" },
  ];

  const handleFormatCode = () => {
    // In a real implementation, we'd use a SQL formatter library
    // This is a placeholder for demonstration
    console.log("Format code functionality would be implemented here");
  };

  return (
    <div className="h-1/2 md:h-auto md:w-2/5 flex flex-col">
      <div className="border-b border-neutral-200 px-4 py-2 flex justify-between items-center bg-neutral-50">
        <h2 className="font-medium text-neutral-800">SQL Schema</h2>
        <div className="flex space-x-2">
          <Select value={dbType} onValueChange={onChangeDbType}>
            <SelectTrigger className="w-32 h-8 text-sm">
              <SelectValue placeholder="Select DB Type" />
            </SelectTrigger>
            <SelectContent>
              {dbTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {onUpdateCode && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onUpdateCode} 
              disabled={isUpdatingCode}
              className="text-xs"
            >
              {isUpdatingCode ? (
                <>
                  <RefreshCcw className="h-3 w-3 mr-1 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <RefreshCcw className="h-3 w-3 mr-1" />
                  Update Code
                </>
              )}
            </Button>
          )}
          
          <Button variant="ghost" size="icon" onClick={handleFormatCode} title="Format Code">
            <CodeIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex-1 overflow-auto bg-neutral-800">
        <SyntaxHighlighter
          language="sql"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            minHeight: '100%',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            fontFamily: '"Fira Code", monospace',
          }}
          wrapLongLines={true}
        >
          {sqlCode || '-- SQL code will appear here after generation'}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
