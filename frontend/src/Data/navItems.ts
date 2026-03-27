export type NavItemType = {
    to: string;
    label: string;
}

export const profileLinks: NavItemType[] =
    [
        {to: "/profile", label: "Профиль"},
        {to: "/cards", label: "Карты"},
        {to: "/myclan", label: "Мой клан"},
        {to: "/messages", label: "Сообщения"},
        {to: "/settings", label: "Настройки"},
    ];
