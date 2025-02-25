import * as React from "react"

import { cn } from "@/lib/utils"

const TextArea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full p-1 text-base transition-colors file:border-0 file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:!outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-md resize-none",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
TextArea.displayName = "TextArea"

export { TextArea }
