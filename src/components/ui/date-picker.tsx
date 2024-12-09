import * as React from "react"
import { Input } from "@/components/ui/input"

export type DatePickerProps = React.InputHTMLAttributes<HTMLInputElement>

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        type="date"
        className={className}
        ref={ref}
        {...props}
      />
    )
  }
)
DatePicker.displayName = "DatePicker"

export { DatePicker }

