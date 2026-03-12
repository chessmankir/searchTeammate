import TelegramBot from  "node-telegram-bot-api";

const token = process.env.BOT_TOKEN;

if(!token){
    throw new Error("no token");
}

export const bot = new TelegramBot(token,{
    polling: false
});