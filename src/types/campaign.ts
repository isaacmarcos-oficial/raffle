declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      phone?: string | null
    };
  }
}

export interface TicketType {
  id: string;
  numbers: string[];
  buyer: {
    id?: string;
    name: string;
    phone: string
  };
  phone: string;
  purchaseDate: string;
  paid: boolean;
  paymentType: "CASH" | "PIX_MANUAL";
  buyerId: string;
  campaign: CampaignType;
  recipientName ?: string
}

export interface BuyerType {
  id: string;
  name: string;
  phone: string;
  tickets: TicketType[]
}

export interface PrizeType {
  id: string;
  title: string;
  description: string;
  winnerNumber?: string;
  winnerName?: string
}

export interface CampaignType {
  id?: string;
  description: string;
  title: string;
  code?: string;
  type?: "FIXED" | "ALEATORY";
  price: number;
  drawDate: string | Date;
  quote: number;
  minQuotes: number;
  digitLength: number;
  pixCode: string;
  contactPhone: string;
  ownerId: string;
  tickets?: TicketType[];
  buyer?: BuyerType[]
  owner: {
    name: string
  }
  prizes: PrizeType[]
}

export interface RaffleState {
  tickets: CampaignType[];
  totalNumbers: number;
}
