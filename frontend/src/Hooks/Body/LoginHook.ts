import {useState} from "react";
import type {LoginStep} from "../../types/LoginStep.ts";
import {useNavigate} from "react-router-dom";
//import dotenv from "dotenv";
import {authStore} from "../../store/authStore.ts";

//dotenv.config();

function clearLoginData() {

}

export  function useLoginHook(){
    const [pubgId, setPubgId] = useState("");
    const [step, setStep] = useState<LoginStep>("request");
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    const setUser = authStore((state) => state.setUser);
    const navigate = useNavigate();

    const sendCodeSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        console.log('sendCode');
        console.log(e);
        console.log(step);
        console.log(pubgId);
      //  console.log(process.env.BACKEND_URL);
        const backendServer = "http://localhost:4000/api/sendcode";
        try{
            const response = await fetch(backendServer,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({pubgId})
            });
            console.log('response');
            console.log(response);
            const data = await response.json();
            console.log('data');
            console.log(data);
            if(data.ok){
                setStep("verify");
                setMessage('Введить полученный код от бота @checkmatePubgBot');

            }
            else{
                setError('Данный пользователь не найден');
            }
        }
        catch (e){
            console.error(e);
        }
    }

    const verifyCodeSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        const backendServer = "http://localhost:4000/api/verifycode";
        try{
            const response = await fetch(backendServer,{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({code, pubgId})
            });
            const data = await response.json();
            if(data.ok){
                console.log("совпало");
                setUser(data.user);
                navigate("/players");
                setPubgId("");
                setStep("request");
                setError("");
                setMessage("");
            }
            else{
                console.log("Не совпадают данные");
            }
        }
        catch (e){
            console.log(e)
        }
    }

    return {pubgId, setPubgId, step,  setStep, code, setCode, verifyCodeSubmit, sendCodeSubmit, error, setError,
            message, setMessage}
}