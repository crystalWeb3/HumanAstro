'use client'
import * as React from "react";
import Image from "next/image";

import { useState } from "react";
import TypingLoader from "./TypingLoader";
import { Button } from "@/components/ui/button";

interface IBotMessage {
    message: string;
    isTyping: boolean;
}

const BotMessage: React.FC<IBotMessage> = ({ message = '', isTyping }) => {

  return (
    <div className="relative flex items-start gap-2 mt-2">
        
        <div className="bg-white rounded-[10px] w-[32px] h-[32px] flex justify-center items-center">
            {/* ---------- input the sparkle icon ---------- */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_2_67" style={{maskType:'luminance'}} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
                <path d="M20 0H0V20H20V0Z" fill="white"/>
                </mask>
                <g mask="url(#mask0_2_67)">
                <mask id="mask1_2_67" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="1" y="1" width="18" height="18">
                <path d="M10.0276 18.75C10.305 14.0559 14.0566 10.295 18.75 10.0061L18.75 9.97239C14.0559 9.69504 10.295 5.94342 10.0061 1.25002L9.97237 1.25006C9.69502 5.94416 5.94339 9.70502 1.25 9.99392L1.25004 10.0277C5.94413 10.305 9.70499 14.0566 9.99389 18.75L10.0276 18.75Z" fill="url(#paint0_linear_2_67)"/>
                </mask>
                <g mask="url(#mask1_2_67)">
                <path d="M10 0C15.519 0 20 4.481 20 10C20 15.519 15.519 20 10 20C4.481 20 0 15.519 0 10C0 4.481 4.481 0 10 0Z" fill="url(#paint1_linear_2_67)"/>
                </g>
                </g>
                <defs>
                <linearGradient id="paint0_linear_2_67" x1="4.24217" y1="15.3134" x2="16.5324" y2="4.8595" gradientUnits="userSpaceOnUse">
                <stop stopColor="#217BFE"/>
                <stop offset="0.14" stopColor="#1485FC"/>
                <stop offset="0.27" stopColor="#078EFB"/>
                <stop offset="0.52" stopColor="#548FFD"/>
                <stop offset="0.78" stopColor="#A190FF"/>
                <stop offset="0.89" stopColor="#AF94FE"/>
                <stop offset="1" stopColor="#BD99FE"/>
                </linearGradient>
                <linearGradient id="paint1_linear_2_67" x1="7.49812" y1="12.8938" x2="15.0575" y2="5.07125" gradientUnits="userSpaceOnUse">
                <stop stopColor="#217BFE"/>
                <stop offset="0.14" stopColor="#1485FC"/>
                <stop offset="0.27" stopColor="#078EFB"/>
                <stop offset="0.52" stopColor="#548FFD"/>
                <stop offset="0.78" stopColor="#A190FF"/>
                <stop offset="0.89" stopColor="#AF94FE"/>
                <stop offset="1" stopColor="#BD99FE"/>
                </linearGradient>
                </defs>
            </svg>
        </div>
        {isTyping ? <div className="flex flex-row transition-transform duration-200 justify-start">
                <div className="flex w-auto max-w-4/5 break-words bg-white rounded-2xl py-1 px-4 shadow-sm">
                    <TypingLoader />
                </div>
            </div>
            : <div className="flex flex-row transition-transform duration-200 justify-start">
                <div className="flex w-auto max-w-4/5 break-words bg-white rounded-2xl py-[24px] px-[17px] shadow-sm text-[15px]">
                    <p>{message}</p>
                </div>
            </div>
        }
    </div>
  )
}

export default BotMessage;