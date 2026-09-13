import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ApiKeyModalProps {
  onSave: (apiKey: string) => void;
  onCancel: () => void;
}

export default function ApiKeyModal({ onSave, onCancel }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "Error",
        description: "Please enter a valid API key",
        variant: "destructive",
      });
      return;
    }

    setIsValidating(true);
    try {
      // Validate the API key
      const response = await apiRequest("POST", "/api/auth/validate-key", { apiKey });
      const data = await response.json();

      if (data.valid) {
        toast({
          title: "Success",
          description: "API key saved successfully",
        });
        onSave(apiKey);
      } else {
        toast({
          title: "Invalid API Key",
          description: "The API key provided is not valid",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to validate API key",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-neutral-200">
          <h3 className="text-lg font-medium text-neutral-900">API Configuration</h3>
        </div>
        <div className="px-6 py-4">
          <p className="text-neutral-600 mb-4">
            To use the AI-powered features, please provide your Anthropic API key. 
            Your key is securely stored in your browser only.
          </p>
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">
              Anthropic API Key
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <Input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="pr-10"
                placeholder="Enter your API key"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setShowApiKey(!showApiKey)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  {showApiKey ? (
                    <EyeOffIcon className="h-4 w-4" />
                  ) : (
                    <EyeIcon className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
            <p className="mt-1 text-xs text-neutral-500">
              Don't have an API key?{" "}
              <a
                href="https://console.anthropic.com/account/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-hover"
              >
                Get one here
              </a>
            </p>
          </div>
        </div>
        <div className="px-6 py-3 bg-neutral-50 rounded-b-lg flex justify-end">
          <Button
            variant="outline"
            onClick={onCancel}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isValidating}
          >
            {isValidating ? "Validating..." : "Save API Key"}
          </Button>
        </div>
      </div>
    </div>
  );
}
