"use client";

import "@/src/StyleSheets/logo.css";
import {useRouter} from "next/navigation";

export  function Logo(){
    const router = useRouter();
    return (
        <div onClick={() => {router.push("/");}} className="myclan-sidebar__logo">
            <div className="myclan-sidebar__logo-icon">C</div>
            <div>
                <div className="myclan-sidebar__logo-title">Checkmate</div>
                <div className="myclan-sidebar__logo-subtitle">Поиск тиммейтов</div>
            </div>
        </div>
    );
}