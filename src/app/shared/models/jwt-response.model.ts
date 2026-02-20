export interface JwtResponse {
  accessToken: string;
  type: string;
  id: string;
  username: string;
  email: string;
  roles: string[];
}
