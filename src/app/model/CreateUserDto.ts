export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
}

export interface RootObject {
    createUserDto: CreateUserDto;
}