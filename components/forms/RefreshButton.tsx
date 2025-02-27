'use client'
import * as React from "react";
import Image from "next/image";

import { useState } from "react";
// import TypingLoader from "./TypingLoader";
// import { Button } from "@/components/ui/button";

interface IRefresh {
    onClick?: () => void;
    // isTyping: boolean;
}

const Refresh: React.FC<IRefresh> = ({onClick}) => {
    const [ rotated, setRotated] = useState(false)

  const handleClick = () => {
    if(onClick) onClick();
    setRotated(prev => !prev);
  };

  return (
    <div 
      className="bg-white relative rounded-[50%] w-[32px] h-[32px] flex justify-center items-center overflow-hidden cursor-pointer p-1"
      onClick={handleClick}
    >
      <Image
        src='/refresh.png'
        width={200}
        height={50}
        alt="sun&moon"
        className={`w-full object-contain object-center transition-transform duration-500 ${rotated ? 'rotate-180' : ''}`}
      />
    </div>
  );
}

export default Refresh;