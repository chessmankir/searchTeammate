export function formatTimeInClan(dateString: string): string {
    const now = new Date();
    const joined = new Date(dateString);

    const diffMs = now.getTime() - joined.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays < 1) return "сегодня";
    if (diffDays < 30) return `${diffDays} дн.`;

    const months = Math.floor(diffDays / 30);
    if (months < 12) return `${months} мес.`;

    const years = Math.floor(months / 12);
    return `${years} г.`;
}
