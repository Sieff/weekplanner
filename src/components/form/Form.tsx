import React from "react";

export const Form = ({children}: React.PropsWithChildren) => {
    return (
        <form className="flex content-start items-start flex-col">
            {children}
        </form>
    )
}