interface EmailPassword {
  email: string;
  password: string;
}

interface SignupReqDto extends EmailPassword {}
interface SigninReqDto extends EmailPassword {}

interface SigninResDto {
  access_token: string;
}
