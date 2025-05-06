
import * as dotenv from 'dotenv';
dotenv.config();
import {registerAs} from "@nestjs/config"
export default registerAs("googleOAuth",()=>({
    clientID:process.env.CLIENTID_GOOGLE,
    clientSecret:process.env.CLIENTSERECT_GOOGLE,
    callbackURL:process.env.CALLBACKURL
}))