import { format } from "date-fns";
import { fromZonedTime } from "date-fns-tz";

/**
 * Converte uma data (string ou Date) para o fuso horário de São Paulo (UTC-3) e retorna no formato desejado.
 * @param dateValue Data no formato string ou objeto Date
 * @returns String formatada no formato "dd/MM/yyyy HH:mm"
 */
export const formatDate = (dateValue: string | Date) => {
  if (!dateValue) return "Data inválida";

  try {
    const timeZone = "America/Sao_Paulo";
    const date = typeof dateValue === "string" ? new Date(dateValue) : dateValue;

    if (isNaN(date.getTime())) {
      return "Data inválida"; // Retorna caso a data seja inválida
    }

    const zonedDate = fromZonedTime(date, timeZone); // Converte para UTC-3
    return format(zonedDate, "dd/MM/yyyy HH:mm"); // Formato brasileiro com hora 24h
  } catch (error) {
    console.error("Erro ao formatar a data:", error);
    return "Data inválida";
  }
};
