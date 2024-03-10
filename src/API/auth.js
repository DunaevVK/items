import MD5 from "crypto-js/md5";

const date = Number(new Date().toISOString().slice(0,10).replace(/-/g,""));
const md5 = MD5('Valantis_'+date).toString();
export const headers = {'X-Auth': md5 };