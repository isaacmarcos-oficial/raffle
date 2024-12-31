declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export interface Campaign {
  id?: string;
  description: string;
  title?: string;
  code?: string;
  type?: "fixed" | "aleatory";
  price: number;
  drawDate: string | Date;
  quote: number;
  minQuotes: number;
  digitLength: number;
  pixCode: string;
  contactPhone: string;
  ownerId: string;
}

export interface Ticket {
  id: string;
  numbers: string[];
  buyer: {
    name: string
  };
  phone: string;
  purchaseDate: string;
  paid: boolean;
  buyerId: string;
  Campaign: Campaign;
}

export interface RaffleState {
  tickets: Ticket[];
  totalNumbers: number;
}
