import {create} from "zustand";

interface AuthUser{
    id: number,
    pubg_id: string,
    nickname?: string,
    actor_id?: string,
}

interface AuthState{
    user: AuthUser | null,
    isAuth: boolean,
    setUser:(user: AuthUser | null) => void,
    clearUser:() => void,
    checkAuth: () => Promise<void>,
}

export const authStore = create<AuthState>((set) => ({
    user: null,
    isAuth: false,
    setUser: ( (user) => set({
            user,
            isAuth: !!user,
        })
    ),
    clearUser: () => set({
        user: null,
        isAuth: false,
    }),
    checkAuth: async () => {
        try{
            const response = await fetch("/api/auth/me",{
                method: "GET",
                credentials: "include"
            });
            const  data = await response.json();
            if(data.ok){
                set({user: data.user, isAuth: true});
            }
            else{
                set({
                    user: null,
                    isAuth: false,
                })
            }
        }
        catch(error){
            console.log(error);
            set({
                isAuth: false,
                user: null,
            })
        }
    }
}));


