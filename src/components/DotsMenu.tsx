import {Portal} from "./Portal";
import more from '../assets/more.svg';
import {useComponentVisible} from "../hooks/UseComponentVisible";
import {useRef} from "react";

type DotsMenuProps = {
    options: Option[];
    optionCallback: (value: any) => void;
}

export type Option = {
    label: string;
    value: any;
}

export const DotsMenu = ({options, optionCallback}: DotsMenuProps) => {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
    const dotsRef = useRef<HTMLDivElement>(null);

    const rect = dotsRef.current?.getBoundingClientRect()!;
    const toggleMenu = (event: any) => {
        stopPropagation(event);
        setIsComponentVisible(!isComponentVisible);
    }

    const stopPropagation = (event: any) => {
        event.stopPropagation();
    }

    return (
        <div className="inline-block hover:bg-divider rounded-full active:bg-neutral-400" onClick={toggleMenu} ref={dotsRef}>
            <div className="flex justify-center items-center cursor-pointer">
                <img src={more} alt="Dot Menu" className={"h-6 w-6"}/>
            </div>
            {isComponentVisible && (
                <Portal>
                    <div onClick={stopPropagation} ref={ref} onMouseLeave={() => setIsComponentVisible(false)} className={"fixed gap-s rounded-rm p-m z-50 flex flex-col translate-x-center translate-y-s bg-white shadow-box"} style={{top: rect.bottom, left: rect.left + rect.width / 2}}>
                        {options.map(option => {
                            return (
                                <div onClick={() => optionCallback(option.value)} className={"hover:bg-divider rounded-rs cursor-pointer p-s"}>
                                    {option.label}
                                </div>
                            )
                        })}
                    </div>
                </Portal>
            )}
        </div>
    )
}