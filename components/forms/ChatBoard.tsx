'use client'
import * as React from "react";
// import Image from "next/image";

import { useEffect, useRef } from "react";
// import { Input } from "@/components/ui/Input";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
// import TypingLoader from "./TypingLoader";

import { MessageType } from "@/lib/type";

interface IChatField {
    messages: MessageType[] | [];
    isBotTyping: boolean;
    isUserTyping: boolean;
}

const ChatField: React.FC<IChatField> = ({ messages, isBotTyping, isUserTyping }) => {

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // // Function to scroll to the bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping, isUserTyping]);
  
  return (
    <div className="flex flex-1 w-full justify-center">
        <div className="flex flex-1 flex-col px-3 md:px-0 gap-3 justify-end max-w-2xl">
          <div className="hidden md:block mb-safe h-16 w-full"></div>
          {/* <div className="flex justify-center items-center w-full font-favorit">
            <div className="flex flex-col justify-center items-center w-fit mt-4 mb-2">
              <h1 className="mb-1 mx-4 text-sm">
                <span className="text-stone-500 opacity-80">Today </span>
                <span> </span>
                <span className="text-stone-500 opacity-60">10:39 PM</span>
              </h1>
            </div>
          </div> */}
          <div className="w-full flex flex-col gap-3">
            {messages.map((msg, idx) => {
                if(msg.type === 0) return (
                    <div key={'bmsg' + idx} className="relative w-full flex-start">
                        <BotMessage message={msg.content} isTyping={false} />
                    </div>
                )
                else if(msg.type === 1) return (
                    <div key={'umsg' + idx} className="relative w-full">
                        <UserMessage message={msg.content} isTyping={false} />
                    </div>
                )
            })}
            { isBotTyping && 
                <div className="relative w-full flex-start">
                    <BotMessage message={'        '} isTyping={true} />
                </div>
            }
            {/* { isUserTyping && 
                <div className="relative w-full">
                    <UserMessage message={'        '} isTyping={true} />
                </div>
            } */}
            <div ref={messagesEndRef} />
          </div>
          <div className="mb-safe h-20 w-full"></div>
        </div>
      </div>
  )
}

export default ChatField;
