interface Tour {
    id: number;
    name: string;
    daystart: string;
    dayend: string;
    price: number;
    special: boolean;
    imgs: string[];
    include: string[];
    exclude: string[];
    overview: string;
    created_at: Date;
    type: string;
    locationId: number;
    hotelId: number;
}

export type { Tour };
