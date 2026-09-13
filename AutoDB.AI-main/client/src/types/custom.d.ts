// Convert DatabaseSchema to SQL schemas
declare module "@shared/types" {
  export interface ERDiagram extends DatabaseSchema {}
}