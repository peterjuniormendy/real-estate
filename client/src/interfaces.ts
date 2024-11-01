export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  // Add any other user properties here
}

export interface CurrentUser {
  _id: string;
  email: string;
  username: string;
  avatar: string;
}

export interface ListingState {
  listings: Listing[];
  currentListing: object | null;
  loading: boolean;
  error: string | null;
}

export interface Listing {
  _id: string;
  name: string;
  description: string;
  price: number;
  location: string;
  imageUrls: string[];
  createdAt: Date;
  updatedAt: Date;
  userId: string; // Reference to the user who created the listing
  // Add any other listing properties here
}

// You might also want to create a type for the entire state
export interface RootState {
  user: {
    user: User | null;
    // loading: boolean;
    // error: string | null;
  };
  listings: {
    listings: Listing[];
    // loading: boolean;
    // error: string | null;
  };
}
