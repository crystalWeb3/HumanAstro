'use client'
import * as React from "react";
import Image from "next/image";

import { useState } from "react";
// import TypingLoader from "./TypingLoader";
// import { Button } from "@/components/ui/button";

interface IBgSwitch {
    onChangeState?: (state: boolean) => void;
    // isTyping: boolean;
}

const BgSwitch: React.FC<IBgSwitch> = ({onChangeState}) => {
  const [ isDark, setIsDark ] = useState<boolean>(true);

  const handleClick = () => {
    if(onChangeState) onChangeState(!isDark);
    setIsDark(!isDark);
  }

  return (
    <div 
      className="bg-white relative rounded-[50%] w-[32px] h-[32px] flex justify-center items-center overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
       <div className={`absolute w-[110px] top-[50%] translate-y-[-50%] transition duration-100 ${isDark? 'left-[-51px]': 'left-[-26px]'}`}>
          <Image
            src='/sun&moon.jpg'
            width={200}
            height={50}
            alt="sun&moon"
          />
       </div>
    </div>
  )
}

export default BgSwitch;