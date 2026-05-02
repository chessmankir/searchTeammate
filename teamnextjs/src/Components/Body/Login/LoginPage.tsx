import "@/src/StyleSheets/Login/login.css";
import {Header} from "@/src/Components/Header/Header";
import {LoginInfo} from "@/src/Components/Body/Login/LoginInfo";
import {LoginCard} from "@/src/Components/Body/Login/LoginCard";

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