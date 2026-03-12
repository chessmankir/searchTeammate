import {useState} from "react";
import type {LoginStep} from "../../types/LoginStep.ts";

export  function useLoginHook(){
    const [pubgId, setPubgId] = useState("");
    const [step, setStep] = useState<LoginStep>("request");
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const sendCodeSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        console.log(e);
        console.log(step);
        console.log(pubgId);
        const backendServer = "http://localhost:4000/api/sendcode";
        try{
            const data = await fetch(backendServer,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({pubgId})
            });
            console.log(data);
            if(data.ok){
                console.log(data.code);
                setStep("verify");
                setMessage('Введить полученный код от бота @checkmatePubgBot');
            }
            else{
                setError('Тут какой-то текст ошибки');
            }

        }
        catch (e){
            console.error(e);
        }



        console.log("sendCodeSubmit");
    }

    const verifyCodeSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        console.log(code);
        console.log(pubgId);
        const backendServer = "http://localhost:4000/api/verifycode";
        try{
            const data = await fetch(backendServer,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({code, pubgId})
            });
            if(data.ok){
                console.log("совпало");
            }
            else{
                console.log("не совпало");
            }
        }
        catch (e){
            console.log(e)
        }
    }

    return {pubgId, setPubgId, step,  setStep, code, setCode, verifyCodeSubmit, sendCodeSubmit, error, setError,
            message, setMessage}
}