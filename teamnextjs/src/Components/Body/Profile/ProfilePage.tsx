import "../../../StyleSheets/profile.css";
import { ProfileMember } from "./ProfileMember.tsx";
import { useProfileHooks } from "../../../Hooks/Body/Profile/useProfileHooks.ts";
import { useStartConversation } from "../../../Hooks/Body/Profile/useStartConversation.ts";
import { ProfileMainCard } from "./ProfileMainCard.tsx";

export default function ProfilePage() {
    const {
        member,
        form,
        updateForm,
        saveCurrentProfile,
        changeGameModeOption,
    } = useProfileHooks();

    const { startConversation } = useStartConversation();

    return (
        <section className="profile-page">
            <div className="profile-content">
                <div className="profile-layout">
                    <ProfileMember
                        startConversation={startConversation}
                        member={member}
                    />

                    <ProfileMainCard
                        form={form}
                        updateForm={updateForm}
                        saveCurrentProfile={saveCurrentProfile}
                        changeGameModeOption={changeGameModeOption}
                    />
                </div>
            </div>
        </section>
    );
}