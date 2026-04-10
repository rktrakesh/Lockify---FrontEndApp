export default interface UserDto {
  id: string;
  name?: string;
  email: string;
  enabled: boolean;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  provider?: string;
}
