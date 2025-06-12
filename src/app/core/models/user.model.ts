export interface User {
    email: string;
    firstName: string;
    id: string;
    idToken?: string;
    lastName: string;
    name: string;
    photoUrl: string;
    provider: 'GOOGLE'| string;
  }