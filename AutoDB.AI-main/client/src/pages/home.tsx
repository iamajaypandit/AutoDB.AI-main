import { useState } from "react";
import Header from "@/components/Header";
import PromptInput from "@/components/PromptInput";
import ErDiagram from "@/components/ErDiagram";
import SchemaCode from "@/components/SchemaCode";
import EntityModal from "@/components/EntityModal";
import { useSchema } from "@/hooks/useSchema";
import { useToast } from "@/hooks/use-toast";
import ApiKeyModal from "@/components/ApiKeyModal";

export default function Home() {
  const { toast } = useToast();
  const { 
    schema, 
    sqlCode, 
    dbType,
    isGenerating,
    isUpdatingCode,
    generateSchema, 
    updateSchema,
    resetSchema,
    changeDbType,
    updateCodeFromDiagram
  } = useSchema();
  
  const [editEntityId, setEditEntityId] = useState<string | null>(null);
  const [addField, setAddField] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);

  const handleGenerate = (prompt: string) => {
    // We now use server-side API key, so no need to check for one in localStorage
    generateSchema(prompt);
  };

  const handleReset = () => {
    resetSchema();
    toast({
      title: "Reset",
      description: "Schema has been reset",
    });
  };

  const handleCopy = () => {
    if (!sqlCode) {
      toast({
        title: "Error",
        description: "No SQL code to copy",
        variant: "destructive",
      });
      return;
    }
    
    navigator.clipboard.writeText(sqlCode);
    toast({
      title: "Copied!",
      description: "SQL code copied to clipboard",
    });
  };

  const handleExport = () => {
    if (!schema || !sqlCode) {
      toast({
        title: "Error",
        description: "No schema to export",
        variant: "destructive",
      });
      return;
    }
    
    const exportData = {
      schema,
      sqlCode,
      dbType,
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = `dbms-schema-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
    
    toast({
      title: "Exported!",
      description: "Schema exported successfully",
    });
  };

  const handleSaveProject = () => {
    toast({
      title: "Coming Soon",
      description: "Project saving functionality will be available soon",
    });
  };

  const handleCloseEntityModal = () => {
    setEditEntityId(null);
    setAddField(false);
  };

  const handleSaveEntity = (entity: any) => {
    if (!schema) return;
    
    const updatedEntities = editEntityId
      ? schema.entities.map(e => (e.id === editEntityId ? entity : e))
      : [...schema.entities, entity];
    
    updateSchema({
      ...schema,
      entities: updatedEntities,
    });
    
    handleCloseEntityModal();
  };

  const handleEditEntity = (entityId: string | null, addField: boolean = false) => {
    setEditEntityId(entityId);
    setAddField(addField);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header 
        onExport={handleExport}
        onSave={handleSaveProject}
      />
      
      <PromptInput 
        onGenerate={handleGenerate}
        onReset={handleReset}
        onCopy={handleCopy}
        isGenerating={isGenerating}
      />
      
      <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
        {schema ? (
          <>
            <ErDiagram 
              schema={schema}
              onUpdateSchema={updateSchema}
              onEditEntity={handleEditEntity}
            />
            
            <SchemaCode 
              sqlCode={sqlCode}
              dbType={dbType}
              onChangeDbType={changeDbType}
              onUpdateCode={updateCodeFromDiagram}
              isUpdatingCode={isUpdatingCode}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-neutral-50 p-6">
            <div className="text-center max-w-xl">
              <h2 className="text-2xl font-semibold text-neutral-800 mb-3">
                Welcome to AI DBMS Generator
              </h2>
              <p className="text-neutral-600 mb-6">
                Enter a description of your database needs in the prompt bar above, and our AI will generate
                a complete database schema with tables, relationships, and SQL code.
              </p>
              <div className="bg-neutral-100 p-4 rounded-md text-sm text-neutral-700">
                <p className="font-medium mb-2">Example prompts you can try:</p>
                <ul className="text-left space-y-2">
                  <li>• Create an e-commerce database with users, products, orders, and reviews</li>
                  <li>• Design a social media database with users, posts, comments, and likes</li>
                  <li>• Make a blog system with authors, articles, categories, and tags</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {editEntityId !== null && schema && (
        <EntityModal
          schema={schema}
          entityId={editEntityId}
          addField={addField}
          onClose={handleCloseEntityModal}
          onSave={handleSaveEntity}
        />
      )}
      
      {showApiKeyModal && (
        <ApiKeyModal
          onSave={(apiKey) => {
            setShowApiKeyModal(false);
          }}
          onCancel={() => setShowApiKeyModal(false)}
        />
      )}
    </div>
  );
}
