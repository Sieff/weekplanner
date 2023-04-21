import React from 'react';
import './styles/styles.css';
import {ModulesManager} from "./components/ModulesManager";
import {PortalRoot} from "./components/Portal";

function App() {
  return (
      <PortalRoot>
          <ModulesManager />
      </PortalRoot>
  );
}

export default App;
