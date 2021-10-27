export class AuthenticateResponseClass {
    userId:      number;
    name:        string;
    email:       string;
    description: string;
    created:     Date;
    lasLogin:    Date;
    imgProfile:  string;
    creatorId:   number;
    token:       string;
    isAdmin:     boolean;
}