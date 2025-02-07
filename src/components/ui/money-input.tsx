import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MoneyInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  currency?: string;
  onChange?: (value: string) => void;
}

const MoneyInput = React.forwardRef<HTMLInputElement, MoneyInputProps>(
  ({ className, currency = "R$", onChange, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState("0,00");

    // Formata o valor para exibição como "0,00"
    const formatDisplayValue = (numericValue: string) => {
      const cleanValue = numericValue.replace(/\D/g, ""); // Remove não numéricos
      const decimalValue = (Number(cleanValue) / 100).toFixed(2);
      return decimalValue.replace(".", ","); // Formato BRL
    };

    // Converte e envia o valor correto ao backend no formato "0.00"
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const rawValue = event.target.value.replace(/\D/g, "");
      const numericValue = (Number(rawValue) / 100).toFixed(2); // Exemplo: "12.50"
      setDisplayValue(formatDisplayValue(rawValue));

      if (onChange) {
        onChange(numericValue); // Envia "0.00" para o backend
      }
    };

    return (
      <div className="relative flex items-center justify-center w-full">
        {/* <span className="flex justify-center w-[85px] rounded-s-lg rounded-e-none border-r-0  text-green-500 bg-primary/10 h-9 items-center font-semibold">
          R$
        </span> */}
        <span className="absolute left-0 px-2 text-green-500 items-center font-semibold pointer-events-none">
          {currency}
        </span>
        <Input
          ref={ref}
          className={cn("pl-8 ", className)}
          inputMode="numeric"
          value={displayValue}
          pattern="\d*(\.\d{0,2})?"
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  }
);

MoneyInput.displayName = "MoneyInput";

export { MoneyInput };
