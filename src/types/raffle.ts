export interface Ticket {
    number: string;
    buyer: string;
    phone: string;
    purchaseDate: Date;
    paid: boolean
  }
  
  export interface RaffleState {
    tickets: Ticket[];
    totalNumbers: number;
  }