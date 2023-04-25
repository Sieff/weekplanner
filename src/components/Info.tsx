import styles from "./Info.module.scss"
import {useRef, useState} from "react";
import {Portal} from "./Portal";

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
                <img src="/info_icon.svg" alt="Info Tooltip" className={styles.icon}/>
            </div>
            {show && (
                <Portal>
                    <div className={styles.toolTip} style={{top: rect.top, left: rect.left + rect.width / 2}}>
                        {text}
                    </div>
                </Portal>
            )}
        </div>
    )
}