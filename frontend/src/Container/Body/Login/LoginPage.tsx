import "../../../StyleSheets/Login/login.css";
import {LoginInfo} from "./LoginInfo.tsx";
import {LoginCard} from "./LoginCard.tsx";
import {Header} from "../../Header/Header.tsx";


export function LoginPage() {
    return (
        <div className="page-container">
            <Header/>
            <section className="login-page">
                <div className="login-page__overlay"/>
                <div className="login-page__container">
                    <LoginInfo/>
                    <LoginCard/>
                </div>
            </section>
        </div>

    );
}