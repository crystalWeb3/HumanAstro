'use client'
import * as React from "react";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { MessageType } from "@/lib/type";

interface IChatField {
  isUserTyping: boolean;
  handleUserTyping: (state: boolean) => void;
  handleBotTyping: (state: boolean) => void;
  addMessage: (msg: MessageType) => void;
}

const ChatField: React.FC<IChatField> = ({ isUserTyping, handleUserTyping, handleBotTyping, addMessage}) => {
  const [ message, setMessage] = useState<string>('');
  const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.target.style.height = 'auto';
    // e.target.style.height = `${e.target.scrollHeight}px`;
    setMessage(e.target.value);
    
    if (!isUserTyping) {
      handleUserTyping(true);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      handleUserTyping(false);
    }, 1000);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      addMessage({type: 1, content: message});
      handleUserTyping(false);
      handleBotTyping(true)
      try {
          const tmpMessage = message;
          setMessage("")
          const response = await fetch("/api/messages/get", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tmpMessage }),
          });
          const data = await response.json();
          if (!response.ok) {
              handleBotTyping(false);
              console.log("Sending message failed.")
          } else {
              addMessage({type: 0, content: data.content})
              console.log("Message sent successfully.")
          }
      } catch (error : unknown) {
          console.log(error)
      } finally {
        handleBotTyping(false)
      }
    }
  }

  useEffect(() => {

  }, [])
  return (
    <form className="w-full h-[56px] relative flex items-center justify-between bg-[#FFFFFF] rounded-[30px] p-3 overflow-hidden" onSubmit={handleSubmit}>
      <Input
        className="text-[14px] overflow-y-auto flex-1"
        placeholder="Ask Oryn Anything..."
        onChange={handleInput}
        value={message}
      />
      <Button
        variant="outline"
        size="icon"
        className="rounded-[30px] bg-gray-200 ml-[10px] flex justify-center items-center w-[40px] h-[40px] bg-[#E3E3E390]"
      >
        <span className="inline-block pl-1">
          <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.6858 6.5299L1.05458 11.4336C0.803472 11.5341 0.564931 11.5125 0.338958 11.3689C0.112986 11.2251 0 11.0165 0 10.743V0.919274C0 0.645802 0.112986 0.437191 0.338958 0.293441C0.564931 0.14983 0.803472 0.128233 1.05458 0.22865L12.6858 5.1324C12.9957 5.26921 13.1506 5.50212 13.1506 5.83115C13.1506 6.16018 12.9957 6.39309 12.6858 6.5299ZM1.25 9.99782L11.125 5.83115L1.25 1.66448V4.74136L5.76917 5.83115L1.25 6.92094V9.99782Z" fill="#1C1B1F"/>
          </svg>
        </span>
      </Button>
    </form>
  )
}

export default ChatField;
