interface User {
    username: string;
    email: string;
    role: string;
}

interface AuthCredentials {
    email: string;
    password: string;
}

interface UserLogin extends AuthCredentials {
    remember: boolean;
}

interface UserSignUp extends AuthCredentials {
    name: string;
}

export type { UserLogin, UserSignUp, User };
