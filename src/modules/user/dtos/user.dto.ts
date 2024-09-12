import { IsNotEmpty, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    fullName   : string;

    @IsNotEmpty()
    @IsString()
    username   : string;

    @IsNotEmpty()
    @IsString()
    @IsStrongPassword()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    @MaxLength(16, { message: 'La contraseña no debe exceder los 16 caracteres' })
    password   : string;

    @IsString()
    status     : string;
}