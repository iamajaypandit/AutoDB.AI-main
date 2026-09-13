import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  RefreshCw, 
  ClipboardCopy,
  Wand2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PromptInputProps {
  onGenerate: (prompt: string) => void;
  onReset: () => void;
  onCopy: () => void;
  isGenerating: boolean;
}

export default function PromptInput({ 
  onGenerate, 
  onReset, 
  onCopy, 
  isGenerating 
}: PromptInputProps) {
  const [prompt, setPrompt] = useState("");
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a database description",
        variant: "destructive",
      });
      return;
    }
    onGenerate(prompt);
  };

  return (
    <div className="bg-white border-b border-neutral-200 px-4 sm:px-6 lg:px-8 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-grow">
            <div className="relative rounded-md shadow-sm">
              <Input
                type="text"
                className="pr-32 h-12"
                placeholder="Describe your database needs (e.g., 'Create an e-commerce database with users, products, and orders')"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleGenerate();
                  }
                }}
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Button 
                  size="sm"
                  className="mr-1" 
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  <Wand2 className="mr-1 h-4 w-4" />
                  {isGenerating ? "Generating..." : "Generate"}
                </Button>
              </div>
            </div>
            <p className="mt-1 text-xs text-neutral-500">
              AI will analyze your description and generate an optimized database schema.
            </p>
          </div>
          <div className="flex md:flex-col justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={onReset}
            >
              <RefreshCw className="mr-1 h-4 w-4" />
              Reset
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={onCopy}
            >
              <ClipboardCopy className="mr-1 h-4 w-4" />
              Copy SQL
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
