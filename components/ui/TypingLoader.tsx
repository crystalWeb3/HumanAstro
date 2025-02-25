'use client'
import * as React from "react";
import Image from "next/image";

import { useState, useEffect } from "react";

interface ITyping {
    isTyping?: boolean;
}

const Typing: React.FC<ITyping> = ({ isTyping = false }) => {
    // const [ isShow, setIsShow ] = useState(false);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         setIsShow(false)
    //     }, 1000);
    //     return () => clearTimeout(timer);
    // }, [])
    // if(!isShow) null; 
    return (
        <div className="flex items-center gap-2">
            <Image
                src='/typing_loader1.webp'
                width={50}
                height={30}
                alt='loader'
            />
        </div>
    )
}

export default Typing;