'use client'
import * as React from "react";
// import Image from "next/image";

// import { useState } from "react";

// import TypingLoader from "./TypingLoader";

interface IUserMessage {
    message: string;
    isTyping: boolean;
}

const UserMessage: React.FC<IUserMessage> = ({ message = ''}) => {

  return (
    <div className="relative flex flex-row transition-transform duration-200 pl-8 justify-end">
        {/* {isTyping && <div className="absolute top-0 right-0 translate-y-[-100%]">
            <TypingLoader />
        </div>} */}
        <div className="flex w-auto max-w-4/5 break-words bg-gray-200 rounded-2xl py-5 px-4 shadow-sm py-[24px] px-[17px] text-[15px]">
            <p>{message}</p>
        </div>
    </div>
  )
}

export default UserMessage;