interface User {
    Name: string;
    Email: string;
    Roles: string[];
    Phone: string;
}

interface AuthCredentials {
    Email: string;
    Password: string;
}

interface UserLogin extends AuthCredentials {
    remember: boolean;
}

interface UserSignUp extends AuthCredentials {
    Name: string;
}

export type { UserLogin, UserSignUp, User };
