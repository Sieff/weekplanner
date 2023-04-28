import React from 'react';
import './styles/styles.css';
import {ModulesManager} from "./components/module-manager/ModulesManager";
import {PortalRoot} from "./components/Portal";
import {Timetable} from "./components/module-display/Timetable";
import {ServiceProvider} from "./services/ServiceProvider";
import {ToolBar} from "./components/ToolBar";

function App() {
  return (
      <ServiceProvider>
          <PortalRoot>
              <div className={"flex flex-col gap-l"}>
                  <Timetable />
                  <ToolBar />
                  <ModulesManager />
              </div>
          </PortalRoot>
      </ServiceProvider>
  );
}

export default App;
