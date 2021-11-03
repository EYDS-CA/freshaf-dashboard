import React, { createContext, useContext } from 'react';
import { Schema, useFreshAfSchema } from '../hooks/freshaf';

const initialState: Schema = {
  version: '',
  questions: [],
  thresholds: undefined,
};

export const SchemaContext = createContext(initialState);

export const SchemaProvider = ({ children }: any) => {
  const { schema, error } = useFreshAfSchema();
  const contextValue: Schema = schema;

  return <SchemaContext.Provider value={contextValue}>{children}</SchemaContext.Provider>;
};

export const useSchemaContext = () => useContext(SchemaContext);
