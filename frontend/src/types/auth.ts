interface User {
    name: string;
    email: string;
    roles: string[];
    phone: string;
}

interface AuthCredentials {
    email: string;
    password: string;
}

interface UserLogin extends AuthCredentials {}

interface UserSignUp extends AuthCredentials {
    name: string;
}

export type { UserLogin, UserSignUp, User };
