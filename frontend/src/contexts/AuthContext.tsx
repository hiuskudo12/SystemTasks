"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from "react";

import { getProfile } from "@/services/auth.service";

interface User {
    user_id: number;
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    refreshProfile: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const refreshProfile = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) {
                setUser(null);
                return;
            }

            const res = await getProfile();

            setUser(res.data);

        } catch (error) {

            localStorage.removeItem("token");
            setUser(null);

        } finally {

            setIsLoading(false);

        }

    };

    const logout = () => {

        localStorage.removeItem("token");
        setUser(null);

    };

    useEffect(() => {

        refreshProfile();

    }, []);

    return (

        <AuthContext.Provider
            value={{
                user,
                isLoading,
                refreshProfile,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>

    );
}

export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {

        throw new Error("useAuth must be used inside AuthProvider");

    }

    return context;
}