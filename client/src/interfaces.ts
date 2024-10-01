export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  // Add any other user properties here
}

export interface Listing {
  id: string;
  title: string;
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
