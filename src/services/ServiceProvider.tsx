import React, {createContext} from "react";
import {TimeService} from "./TimeService";
import {WeekdayService} from "./WeekdayService";
import {VariantService} from "./VariantService";

export const TimeServiceContext = createContext<TimeService>(null!);
export const WeekdayServiceContext = createContext<WeekdayService>(null!);
export const VariantServiceContext = createContext<VariantService>(null!);

export const ServiceProvider = ({children}: React.PropsWithChildren) => {
    return (
        <TimeServiceContext.Provider value={new TimeService()}>
            <WeekdayServiceContext.Provider value={new WeekdayService()}>
                <VariantServiceContext.Provider value={new VariantService()}>
                    {children}
                </VariantServiceContext.Provider>
            </WeekdayServiceContext.Provider>
        </TimeServiceContext.Provider>
    )
}