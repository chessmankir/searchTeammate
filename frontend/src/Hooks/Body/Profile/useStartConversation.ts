import { useNavigate } from "react-router-dom";

export function useStartConversation() {
    const navigate = useNavigate();

    const startConversation = async (member_id: number): Promise<boolean> => {
        const backend = `/api/conversation?member_id=${member_id}`;

        try {
            const response = await fetch(backend, {
                credentials: "include",
            });

            const data = await response.json();

            if (data.ok) {
                navigate(`/messages?conversation=${data.conversationId}`);
                return true;
            }

            return false;
        } catch (e) {
            console.log(e);
            return false;
        }
    };

    return { startConversation };
}