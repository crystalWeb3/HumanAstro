'use client';
import React, { useState } from 'react';
// import Image from "next/image";

import ChatField from "@/components/forms/ChatField";
import ChatBoard from "@/components/forms/ChatBoard";
// import BgSwitch from "@/components/forms/BgSwitch";

import { MessageType } from '@/lib/type';

const fakeMessages: MessageType[] = [
  {
    type: 0,
    content: "Hey What is going on?"
  },
  {
    type: 1,
    content: "It's fine."
  },
]

export default function Home() {
  const [messages, setMessages] = useState<MessageType[] | []>(fakeMessages)
  const [ isBotTyping, setIsBotTyping ] = useState<boolean>(false);
  const [ isUserTyping, setIsUserTyping ] = useState<boolean>(false);
  // const [ bgDark, setBgDark ] = useState<boolean>(false);

  const handleUserTyping = (state: boolean) => {
    setIsUserTyping(state)
  }

  const handleBotTyping = (state: boolean) => {
    setIsBotTyping(state)
  }

  const addMessage = (msg: MessageType) => {
    setMessages(prev => {
      const tmp = [ ...prev ];
      tmp.push(msg);
      return tmp;
    })
  }

  // const handleBgChange = (state: boolean) => {
    
  // }

  return (
    <div className={`flex flex-col bg-[url("/b-1.jfif")] overflow-auto bg-fixed `}>
      {/* Header Donald  */}
      <div className="w-full md:fixed top-0 pt-5 pb-3 px-3 md:px-10 lg:px-14 flex justify-between z-10">
        <div className='flex items-center gap-2'>
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
          <span className='font-bold'>Oryn</span>
        </div>
        <div className="flex gap-3">
          {/* <BgSwitch onChangeState={handleBgChange} /> */}
          <div className="bg-white rounded-[50%] w-[32px] h-[32px] flex justify-center items-center">
            {/* ----------------- user Icon ---------------- */}
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_2_60" style={{maskType:'alpha'}} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="17">
              <rect y="0.333313" width="16" height="16" fill="#D9D9D9"/>
              </mask>
              <g mask="url(#mask0_2_60)">
              <path d="M8 8.12815C7.35833 8.12815 6.80906 7.89971 6.35217 7.44282C5.89517 6.98582 5.66667 6.43649 5.66667 5.79482C5.66667 5.15315 5.89517 4.60388 6.35217 4.14699C6.80906 3.68999 7.35833 3.46149 8 3.46149C8.64167 3.46149 9.19094 3.68999 9.64783 4.14699C10.1048 4.60388 10.3333 5.15315 10.3333 5.79482C10.3333 6.43649 10.1048 6.98582 9.64783 7.44282C9.19094 7.89971 8.64167 8.12815 8 8.12815ZM3 12.1923V11.723C3 11.3965 3.08867 11.0942 3.266 10.816C3.44333 10.5378 3.68033 10.3239 3.977 10.1743C4.63589 9.85132 5.30061 9.60904 5.97117 9.44749C6.64172 9.28593 7.318 9.20515 8 9.20515C8.682 9.20515 9.35828 9.28593 10.0288 9.44749C10.6994 9.60904 11.3641 9.85132 12.023 10.1743C12.3197 10.3239 12.5567 10.5378 12.734 10.816C12.9113 11.0942 13 11.3965 13 11.723V12.1923C13 12.4734 12.9015 12.7125 12.7045 12.9097C12.5075 13.1067 12.2684 13.2052 11.9872 13.2052H4.01283C3.73161 13.2052 3.4925 13.1067 3.2955 12.9097C3.0985 12.7125 3 12.4734 3 12.1923ZM4 12.2052H12V11.723C12 11.588 11.9609 11.463 11.8827 11.348C11.8044 11.2331 11.6983 11.1393 11.5642 11.0667C10.9897 10.7838 10.4041 10.5694 9.80717 10.4237C9.21017 10.278 8.60778 10.2052 8 10.2052C7.39222 10.2052 6.78983 10.278 6.19283 10.4237C5.59594 10.5694 5.01028 10.7838 4.43583 11.0667C4.30172 11.1393 4.19556 11.2331 4.11733 11.348C4.03911 11.463 4 11.588 4 11.723V12.2052ZM8 7.12815C8.36667 7.12815 8.68056 6.9976 8.94167 6.73649C9.20278 6.47538 9.33333 6.16149 9.33333 5.79482C9.33333 5.42815 9.20278 5.11426 8.94167 4.85315C8.68056 4.59204 8.36667 4.46149 8 4.46149C7.63333 4.46149 7.31944 4.59204 7.05833 4.85315C6.79722 5.11426 6.66667 5.42815 6.66667 5.79482C6.66667 6.16149 6.79722 6.47538 7.05833 6.73649C7.31944 6.9976 7.63333 7.12815 8 7.12815Z" fill="#1C1B1F"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
    
      {/* <div className='flex-1'> */}
        <ChatBoard messages={messages} isBotTyping={isBotTyping} isUserTyping={isUserTyping} />
      {/* </div> */}

      <div className="fixed bottom-[20px] w-full px-3 md:px-0 w-full md:w-[42rem] left-[50%] translate-x-[-50%]">
        <ChatField isUserTyping={isUserTyping} handleBotTyping={handleBotTyping} handleUserTyping={handleUserTyping} addMessage={addMessage} />
      </div>
    </div>
  );
}
