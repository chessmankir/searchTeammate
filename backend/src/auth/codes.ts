interface LoginCode{
  pubgId: string,
  code: string
}

const loginCodes = new Map<string,LoginCode>();

export function createLoginCode(pubgId: string){
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    loginCodes.set(pubgId, {
        pubgId: pubgId,
        code: code
    });
    return code;
}

export function getLoginCode(pubgId: string){
    return loginCodes.get(pubgId);
}