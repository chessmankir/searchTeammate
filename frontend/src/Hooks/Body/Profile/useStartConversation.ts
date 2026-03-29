import {useNavigate} from "react-router-dom";

export function useStartConversation(){
    const navigate = useNavigate();
    const startConversation = (async (member_id: number)=> {
        const backend = `http://localhost:4000/api/conversation?profile_id=${member_id}`;
        try{
            const response = await fetch(backend,{
                credentials: "include",
            });
            const data = await response.json();
            if(data.ok){
                console.log('navigate');
                 navigate(`/messages?conversation=${data.conversationId}`);
            }
            else{
                return false;
            }
        }
        catch (e){
            console.log(e);
        }
    });
    return {startConversation};
}