export interface UserModel {
    id?        : number;
    fullName   : string;
    username   : string;
    password   : string;
    status     : string;
    createdAt? : Date;
    updatedAt? : Date;
}