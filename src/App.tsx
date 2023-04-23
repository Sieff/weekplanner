import React from 'react';
import './styles/styles.css';
import {ModulesManager} from "./components/module-manager/ModulesManager";
import {PortalRoot} from "./components/Portal";
import {Timetable} from "./components/module-display/Timetable";
import {ServiceProvider} from "./services/ServiceProvider";

function App() {
  return (
      <ServiceProvider>
          <PortalRoot>
              <Timetable />
              <ModulesManager />
          </PortalRoot>
      </ServiceProvider>
  );
}

export default App;
