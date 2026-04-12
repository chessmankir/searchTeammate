type ProfileActionButtonsProps = {
    saveProfile: () => Promise<void>;
};

export function ProfileActionButtons({ saveProfile }: ProfileActionButtonsProps) {
    return (
        <div className="profile-actions">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    saveProfile();
                }}
                className="profile-btn profile-btn--primary"
            >
                Сохранить
            </button>

            <button className="profile-btn profile-btn--ghost">
                Сбросить
            </button>
        </div>
    );
}