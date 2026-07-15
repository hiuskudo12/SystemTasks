export interface User {

    user_id: number;

    username: string;

    email: string;

}

export interface LoginResponse {

    success: boolean;

    message: string;

    data: {

        token: string;

        user: User;

    };

}