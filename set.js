const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0cxdEt3SFI2QkpMMnFPRE01RW1CcVdBQTMwMGFNSjNwa3JLY3RDb1kwWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZk5kSi9oMFBOQmswa2VCaUdxK3hTdWRBVE1kRWxDMHFHY3BneWl0bnRGYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJTTGJWVVhkWkJjRU9VSFQ4TE00U2krM0Q4Y1I5Q2VuTEJrRUFJcjh4U2wwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0b2REYVJ2VWVGSnlxRExTSTFvUC9BMEtQQTNTV2c1SnVNbHhhdmxJbURzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVQOTZxejZmeHlJWHppWHlGUDJoV2ZHOER1Q3JXcm5ISTN5TU1tSTloa1E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJncXcwd05KdjVJSlc3c2VMd2dqSTdCeXJLSzdNbDd1U04vR3czdFhhM2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUVnRCtONVowZlBXU0tkRnl2WUJDVXNRVjdKT0hPSkZVMXA4UUE0eXZWWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVEhwdExOSTBURXJXZ1p2NWJaeDBaN2JaTFNSMjgxNTBLeU4xWlAzZERUYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik96TC9zVFpRR2VNZmx3OUhqRE4wYmx5ZEJKb1VybkhzYXdLTlhDQmJxd2M2aHlKaSt2QWlKeGdhVVpYa3RFVllpSXBEcWVvbGxNV2FMbUorZnVhbkJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTk3LCJhZHZTZWNyZXRLZXkiOiJLNDBmUmtuNEdwcm5JRVlaSnFVTWg4T2VJMnU3NUpOc3N4eFVSNUxTMnowPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJqZEtzYUJvSFFJeTBZODlQOFc2bndRIiwicGhvbmVJZCI6IjRkNmYzZTI4LTBlYWUtNDFlNy05ODg4LTU4ZTNkMzNhOTcyMyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJEUDd1MDRIb2xHMjN6c1BwNzhPRXBZRkhSWFk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYkFaa2JZN2cvWnlqWmYxc3lOSHdOT3dhYTdRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlBZUzRQSEtIIiwibWUiOnsiaWQiOiIyMzQ4MTM4NjIxOTgyOjc3QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCTiojwkoacJCBDSiDCo/CShpzwk4qJICDwk4OsICAgXG7igKLwk4WLICAgXG7wk4OsIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOejdudlVERVBiVHVMVUdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIrbkRnNXUxYkRHY0lTQUppK2s4UUwzbi94bEhyTkZ6V21UZjJaeUFsSVFJPSIsImFjY291bnRTaWduYXR1cmUiOiJ3QnZEdkFlMFFjcmtaME9HeFh0djlrMm5ZVlVOd25pZERsQXBiUEtkKzZVcDJFb1JveXpwMi9IUTN2YzA1cmhOdEpGdnVuNWNDWFkxR29ubmFkbnBCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVXM5Q2l3ZlBEQitHOWtmSWQwR08zaXYvdDQ1N3ZCRWE5aGdQV0RQY2tHRTFwUE4vQ2NoalF2bGxKTGhZblAyUzU1cU1KRjlISzV6bnY3T05zb0ZtREE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MTM4NjIxOTgyOjc3QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmZwdzRPYnRXd3huQ0VnQ1l2cFBFQzk1LzhaUjZ6UmMxcGszOW1jZ0pTRUMifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjI2OTAwNTEsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBRHNCIn0=',
    PREFIXE: process.env.PREFIX || "!",
    OWNER_NAME: process.env.OWNER_NAME || "$ CJ £",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "08138621982",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
