import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase-client";

interface AuthContextType {
    user: User | null;
    signInWithGoogle: () => Promise<void>;
    signInwithGithub: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setUser(session?.user ?? null);
        });
        const {data: listener} = supabase.auth.onAuthStateChange((_, session) => {
            setUser(session?.user ?? null);
        });
        return() =>{
            listener.subscription.unsubscribe();
        }
    }, [])
    const signInWithGoogle = async () => {
        supabase.auth.signInWithOAuth({provider: "google"})
    };

    const signInwithGithub = async () =>{
        supabase.auth.signInWithOAuth({provider: "github"})
    }
    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error signing out:", error.message);
        } else {
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signInwithGithub, signOut }}>
            {" "}
            {children}{" "}
        </AuthContext.Provider>
    );  
}

export const useAuth = (): AuthContextType =>{
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
