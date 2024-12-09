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

export interface Ticket {
	id?: string;
	number: string;
	buyer: string;
	phone: string;
	purchaseDate: Date;
	paid: boolean;
}

export interface RaffleState {
	tickets: Ticket[];
	totalNumbers: number;
}
