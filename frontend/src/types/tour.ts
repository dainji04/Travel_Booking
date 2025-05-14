interface Tour {
    id: number;
    Name: string;
    DayStart: string;
    DayEnd: string;
    Price: number;
    Special: boolean;
    Imgs: string[];
    Includes: string[];
    Excludes: string[];
    Overview: string;
    Created_at: Date;
    Type: string;
    locationId: number;
    hotelId: number;
    Thumbnail: string;
}

export type { Tour };
