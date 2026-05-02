import {CardDuplicatesPage} from "@/src/Components/Body/Cards/Duplicates/CardDuplicatePage";
import {CardFilterWrapper} from "@/src/Components/LeftSideBar/CardFilter/CardFilterWrapper";
import {Header} from "@/src/Components/Header/Header";

export default function Page(){
    return (
            <div id="container-layout" className="container cards-super-layout">
                <aside className="app-sidebar">
                    <CardFilterWrapper/>
                </aside>
                <div className="app-main">
                    <Header/>
                    <main className="app-content">
                        <CardDuplicatesPage />
                    </main>
                </div>
            </div>
    )
}