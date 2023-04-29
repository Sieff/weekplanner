import {useRef, useState} from "react";
import {Portal} from "./Portal";
import info from '../assets/info_icon.svg';

type InfoProps = {
    text: string;
}

export const Info = ({text}: InfoProps) => {
    const [show, setShow] = useState(false);
    const infoRef = useRef<HTMLDivElement>(null);

    const rect = infoRef.current?.getBoundingClientRect()!;

    return (
        <div className="inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} ref={infoRef}>
            <div className="flex content-center items-center cursor-pointer">
                <img src={info} alt="Info Tooltip" className={"h-6 w-6"}/>
            </div>
            {show && (
                <Portal>
                    <div className={"fixed bg-inactive text-white rounded-rs p-s z-50 max-w-xs translate-x-center translate-y-above"} style={{top: rect.top, left: rect.left + rect.width / 2}}>
                        {text}
                    </div>
                </Portal>
            )}
        </div>
    )
}