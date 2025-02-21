import Image from "next/image";
// import ChatFielf from "@/components/forms/ChatField";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div>
      <div></div>

      {/* Header Donald  */}
      <div className="fixed top-0 left-0 w-full flex flex-shrink-0 justify-center items-center min-h-16 pt-safe-or-1 pb-2 transition-all duration-500 bg-white ease-in-out cursor-pointer max-h-[16] shadow-sm">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="relative flex flex-row justify-center items-center w-full">
            <span className="whitespace-nowrap font-miller max-w-96 opacity-100 pr-4 translate-y-[2px] overflow-hidden transition-all duration-250 ease-in-out text-xl">
              Donald
            </span>
            <div className="max-h-12 w-12 h-12 mt-0 flex flex-col justify-center items-center transition-all duration-500 ease-in-out">
              <div className="relative flex items-center justify-center w-full h-full">
                <Image
                  src="https://friend.com/preset/2998000b-13a1-4878-b5dc-14b6db15d1c3.jpg"
                  alt="Avatar"
                  width={30}
                  height={30}
                  className="w-full h-full rounded-full object-cover shadow-lg"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Header buttons */}
      <div className="flex justify-center w-full fixed top-safe-or-1 left-0 pointer-events-none ">
        <div className="flex max-w-[768px] h-14 flex-1 mx-2">
          <div className="flex flex-row justify-start w-1/2 gap-2">
            <div className="flex flex-col justify-center items-center flex-grow-0 pointer-events-auto">
              <button className="flex flex-col justify-center items-center border aspect-square rounded-full bg-white text-black w-8">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="m-auto transition-transform duration-300 "
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H352c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V80c0-17.7-14.3-32-32-32s-32 14.3-32 32v35.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V432c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H160c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"></path>
                </svg>
              </button>
            </div>
            <div className="transition-opacity opacity-0 pointer-events-none duration-500 backdrop-blur-lg flex flex-col justify-center items-center w-screen h-screen fixed top-0 left-0 bg-white/50 gap-4">
              <p className="text-4xl font-miller">Meet Someone New?</p>
              <div className="flex flex-row justify-center items-center gap-8">
                <button className="text-white text-lg font-favorit rounded-2xl bg-zinc-800 hover:bg-danger-red px-4 py-2 transition-colors">
                  Yes
                </button>
                <button className="text-black text-lg font-favorit rounded-2xl bg-white border-zinc-800 hover:bg-zinc-100 px-4 py-2 transition-colors">
                  No{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-end w-1/2 gap-2">
            <div className="flex flex-col justify-center items-center flex-grow-0 pointer-events-auto">
              <button className="flex flex-col justify-center items-center border aspect-square rounded-full bg-white text-black w-8">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  className="inline-block undefined"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.4144 9.00015L12.0002 2.58594L5.58594 9.00015H11V16H13V9.00015H18.4144ZM3 14V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V14H19V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V14H3Z"></path>
                </svg>
              </button>
            </div>
            <div className="flex flex-col justify-center items-center flex-grow-0 text-md text-stone-300 transition-all duration-300 underline pointer-events-auto">
              <button className="flex flex-col justify-center items-center border aspect-square rounded-full bg-white text-black w-8">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="inline-block undefined"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 w-full justify-center">
        <div className="flex flex-1 flex-col-reverse pl-2 pr-2 gap-2 justify-end max-w-screen-md">
          <div className="mb-safe h-14 w-full"></div>
          <div className="relative w-full">
            <div className="flex flex-row transition-transform duration-200 pl-8 justify-start">
              <div className="flex w-auto max-w-4/5 break-words bg-gray-100 rounded-bl-md  rounded-tl-2xl rounded-r-2xl pt-2 pb-2 pl-3 pr-3 shadow-sm">
                <p>Hey What's up?</p>
              </div>
            </div>
            <div className="absolute left-0 top-0 w-6 h-6">
              <div className="relative flex items-center justify-center w-full h-full">
                <Image
                  src="https://friend.com/preset/2998000b-13a1-4878-b5dc-14b6db15d1c3.jpg"
                  alt="Avatar"
                  width={20}
                  height={20}
                  className="w-full h-full rounded-full object-cover shadow-lg"
                />
              </div>
            </div>
          </div>

          <div className="relative w-full">
            <div className="flex flex-row transition-transform duration-200 pl-8 justify-end">
              <div className="flex w-auto max-w-4/5 break-words bg-zinc-800 text-slate-50 rounded-br-2xl rounded-t-2xl rounded-l-2xl pt-2 pb-2 pl-3 pr-3 shadow-sm">
                <p>How are you?</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center w-full font-favorit">
            <div className="flex flex-col justify-center items-center w-fit mt-4 mb-2">
              <h1 className="mb-1 mx-4 text-sm">
                <span className="text-stone-500 opacity-80">Today </span>
                <span> </span>
                <span className="text-stone-500 opacity-60">10:39 PM</span>
              </h1>
            </div>
          </div>

          <div className="mb-safe h-14 w-full"></div>
        </div>
      </div>

      <div className="absolute bottom-[20px] w-[50%] left-[50%] translate-x-[-50%]">
        <div className="flex">
          <Input
            className="bg-gray-100 border-rounded rounded-[40px]"
            placeholder="Message"
          />
          <Button
            variant="outline"
            size="icon"
            className="border-rounded rounded-[30px] ml-[10px]"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="inline-block undefined"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path>
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
}
