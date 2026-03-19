import "../../StyleSheets/logo.css";

export  function Logo(){
    return (
        <div id="logo">
            <a href="/index.html" className="brand-link">
                <img src="/src/assets/AdminLTELogo.png" alt=""
                className="brand-image opacity-75 shadow"/> <span
                className="brand-text fw-light">Поиск Тиммейтов</span>
            </a>
        </div>
    );
}