import type UserDto from "./UserDto";

export default interface LoginResponseData {
  accessToken: string;
  userDto: UserDto;
  refreshToken: string;
  expiresIn: number;
}
