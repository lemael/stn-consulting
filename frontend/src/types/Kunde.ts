export type Gender = "Herr" | "Frau";

export interface Kunde {
  gender: Gender;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}
