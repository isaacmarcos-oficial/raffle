import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

const Stepper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex gap-2", className)}
    {...props}
  />
));
Stepper.displayName = "Stepper";

const StepperItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center gap-2 group data-[disabled]:pointer-events-none",
      className
    )}
    {...props}
  />
));
StepperItem.displayName = "StepperItem";

const StepperIndicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-full text-muted-foreground/50 w-8 h-8",
      "group-data-[disabled]:text-muted-foreground group-data-[disabled]:opacity-50",
      "group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground",
      "group-data-[state=completed]:bg-accent group-data-[state=completed]:text-accent-foreground",
      className
    )}
    {...props}
  />
));
StepperIndicator.displayName = "StepperIndicator";

const StepperTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    size="icon"
    className={cn(
      "flex justify-center w-10 h-10 border-2 transition-all p-1 rounded-full items-center text-center gap-1 z-30 bg-muted text-primary ",
      "group-data-[state=completed]:bg-green-500 group-data-[state=completed]:text-primary-foreground group-data-[state=completed]:border-green-500 group-data-[state=completed]:ring-2 group-data-[state=completed]:ring-ring",
      "group-data-[state=active]:bg-yellow-500", className
    )}
    {...props}
  />
));
StepperTrigger.displayName = "StepperTrigger";

const StepperSeparator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute top-5 w-full h-[2px] bg-muted group-data-[disabled]:bg-muted group-data-[disabled]:opacity-50 group-data-[state=completed]:bg-accent-foreground left-[-50%] right-[-50%] z-20", className
    )}
    {...props}
  />
));
StepperSeparator.displayName = "StepperSeparator";

const StepperTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-md font-semibold whitespace-nowrap", className)}
    {...props}
  />
));
StepperTitle.displayName = "StepperTitle";

const StepperDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-muted-foreground", className)}
    {...props}
  />
));
StepperDescription.displayName = "StepperDescription";

export {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperTrigger,
  StepperSeparator,
  StepperTitle,
  StepperDescription,
};
