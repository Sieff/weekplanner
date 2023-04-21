import React, { createContext, useContext, useRef } from "react";
import { createPortal } from "react-dom";

const PortalContext = createContext<React.MutableRefObject<HTMLDivElement | null>>({ current: null });

type PortalRootProps = React.PropsWithChildren;

/**
 * This component provides an empty portal root for its children. If a Portal is used
 * somewhere in this component's child tree, the Portal will be rendered here.
 */
export const PortalRoot = ({ children }: PortalRootProps) => {
    const node = useRef<HTMLDivElement>(null);

    return (
        <PortalContext.Provider value={node}>
            {children}
            <div ref={node}></div>
        </PortalContext.Provider>
    );
}

type PortalProps = React.PropsWithChildren;

/**
 * Renders the child component(s) inside of a Portal in the nearest PortalRoot component.
 * This is useful for elements that need to be elsewhere in the DOM tree, e.g. modals,
 * popovers or tooltips.
 */
export function Portal({ children }: PortalProps) {
    const root = useContext(PortalContext);

    if (!root.current) return null;

    return createPortal(children, root.current);
}