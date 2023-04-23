import React, {createContext} from "react";
import {TimeService} from "./TimeService";
import {WeekdayService} from "./WeekdayService";

export const TimeServiceContext = createContext<TimeService>(null!);
export const WeekdayServiceContext = createContext<WeekdayService>(null!);

export const ServiceProvider = ({children}: React.PropsWithChildren) => {
    return (
        <TimeServiceContext.Provider value={new TimeService()}>
            <WeekdayServiceContext.Provider value={new WeekdayService()}>
                {children}
            </WeekdayServiceContext.Provider>
        </TimeServiceContext.Provider>
    )
}