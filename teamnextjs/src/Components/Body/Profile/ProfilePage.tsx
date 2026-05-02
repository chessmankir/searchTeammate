"use client";
import "@/src/StyleSheets/profile.css";
import { useProfileHooks } from "@/src/Hooks/Body/Profile/useProfileHooks.ts";
import { useStartConversation } from "@/src/Hooks/Body/Profile/useStartConversation.ts";
import {ProfileMainCard} from "@/src/Components/Body/Profile/ProfileMainCard";
import {ProfileMember} from "@/src/Components/Body/Profile/ProfileMember";

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