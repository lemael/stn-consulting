export type Bild = {
  id: number;
  image: string;
};

export interface HausZuVerkaufen {
  id: number;
  title: string;
  description: string;
  price: number;
  address: string;
  surface: number;
  rooms: number;
  bilder: Bild[];
}
