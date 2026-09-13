// Database entity types
export interface Field {
  id: string;
  name: string;
  type: string;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
  isNotNull: boolean;
  isUnique: boolean;
  defaultValue: string | null;
  references?: {
    table: string;
    field: string;
  };
}

export interface Entity {
  id: string;
  name: string;
  fields: Field[];
  position: { x: number; y: number };
}

export interface Relationship {
  id: string;
  sourceEntityId: string;
  sourceFieldId: string;
  targetEntityId: string;
  targetFieldId: string;
  type: string;
}

export interface DatabaseSchema {
  entities: Entity[];
  relationships: Relationship[];
}

// Request/Response types
export interface GenerateSchemaRequest {
  prompt: string;
  dbType: string;
}

export interface GenerateSchemaResponse {
  schema: DatabaseSchema;
  sqlCode: string;
}

export type DbType = 'PostgreSQL' | 'MySQL' | 'SQLite';