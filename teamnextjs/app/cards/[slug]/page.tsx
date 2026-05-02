import {CurrentCardPage} from "@/src/Components/Body/Cards/CurrentCardPage";
import {CardFilterWrapper} from "@/src/Components/LeftSideBar/CardFilter/CardFilterWrapper";
import {Header} from "@/src/Components/Header/Header";
import {CardsPage} from "@/src/Components/Body/Cards/CardsPage";

export default function Page(){
    return (
        <div id="container-layout" className="container cards-super-layout">
            <aside className="app-sidebar">
                <CardFilterWrapper/>
            </aside>
            <div className="app-main">
                <Header/>
                <main className="app-content">
                    <CurrentCardPage/>
                </main>
            </div>
        </div>
    );
}