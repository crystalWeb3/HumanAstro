'use client'
import * as React from "react";
// import Image from "next/image";

// import { useState } from "react";
// import TypingLoader from "./TypingLoader";
// import { Button } from "@/components/ui/button";

interface IBotMessage {
    message: string;
    isTyping: boolean;
}

const BotMessage: React.FC<IBotMessage> = ({ message = '', isTyping }) => {

  return (
    <div className="bg-white rounded-[50%] w-[32px] h-[32px] flex justify-center items-center">
       {/* <Image
            src='sun&moon.jpg'
       /> */}
    </div>
  )
}

export default BotMessage;