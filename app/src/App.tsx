import { CssBaseline } from '@material-ui/core';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeWrapper } from './components';
import { ProjectProvider } from './providers/Projects';
import { SchemaProvider } from './providers/Schema';
import { Routes } from './routes';

function App() {
  return (
    <ThemeWrapper>
      <BrowserRouter basename="/">
        <SchemaProvider>
          <ProjectProvider>
            <CssBaseline />
            <Routes />
          </ProjectProvider>
        </SchemaProvider>
      </BrowserRouter>
    </ThemeWrapper>
  );
}

export default App;
