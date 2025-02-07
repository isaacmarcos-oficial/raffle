import * as React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface DatePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
  allowPastDates?: boolean;
  allowFutureDates?: boolean;
  minDate?: Date;
  maxDate?: Date;
  onDateChange?: (formattedDate: string) => void;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, allowPastDates = true, allowFutureDates = true, minDate, maxDate, onDateChange, value, ...props }, ref) => {
    
    const adjustToLocal = (utcDate: string) => {
      if (!utcDate) return "";
      const date = new Date(utcDate);
      date.setHours(date.getHours() - 3); // Ajusta UTC-3
      return date.toISOString().slice(0, 16); // Formato para input datetime-local
    };
    
    const [dateValue, setDateValue] = React.useState<string>(
      adjustToLocal(value as string) || ""
    );
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const dateValue = event.target.value;
      
      if (!dateValue) return; // Evita erro se o campo for limpo

      const selectedDate = new Date(dateValue);

      if (isNaN(selectedDate.getTime())) {
        console.error("Data inválida selecionada:", dateValue);
        return; // Evita erro ao tentar formatar uma data inválida
      }

      // Ajuste automático para UTC-3
      const offsetDate = new Date(selectedDate.getTime() - (3 * 60 * 60 * 1000));
      const formattedDate = offsetDate.toISOString().slice(0, 16); // Formato YYYY-MM-DDTHH:mm

      // Restrições de data
      const now = new Date();
      const minDateTime = minDate || (!allowPastDates ? now : null);
      const maxDateTime = maxDate || (!allowFutureDates ? now : null);

      if (minDateTime && selectedDate < minDateTime) return;
      if (maxDateTime && selectedDate > maxDateTime) return;

      // Atualiza o estado interno e dispara o callback
      setDateValue(formattedDate);
      if (onDateChange) {
        onDateChange(formattedDate);
      }
    };

    return (
      <Input
        type="datetime-local"
        className={cn(className, "flex w-full")}
        ref={ref}
        value={dateValue}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
