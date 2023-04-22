import React from 'react';
import './styles/styles.css';
import {ModulesManager} from "./components/module-manager/ModulesManager";
import {PortalRoot} from "./components/Portal";
import {Timetable} from "./components/module-display/Timetable";

function App() {
  return (
      <PortalRoot>
          <Timetable />
          <ModulesManager />
      </PortalRoot>
  );
}

export default App;
