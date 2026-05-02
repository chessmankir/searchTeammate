import {useRouter} from "next/navigation";

export function useStartConversation() {
    const navigate = useRouter();

    const startConversation = async (member_id: number): Promise<boolean> => {
        console.log("startConversation");
        console.log(member_id);
        const url = process.env.NEXT_PUBLIC_API_URL;
        const backend = `${url}/api/conversation?member_id=${member_id}`;
        console.log(backend);
        try {
            const response = await fetch(backend, {
                credentials: "include",
            });

            const data = await response.json();
            console.log(data);
            if (data.ok) {
                navigate.push(`/messages?conversation=${data.conversationId}`);
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