import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import schema from '@functions/auth/schema';
import { UsersRepository } from '@repositories/users'
import { UserInterface } from '@models/users';
import { SessionsRepository } from '@repositories/sessions';
import { v4 as UUID4 } from "uuid";
import bcrypt from "bcryptjs";

const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
    const userRepo = new UsersRepository();
    const foundUser: UserInterface[] = await userRepo.getUser(event.body.email_address);
    
    if (!foundUser[0] || !foundUser[0].user_name)
        return formatJSONResponse({
            message: "Invalid credentials"
        }) 

    if(!bcrypt.compareSync(event.body.password, foundUser[0].password))
        return formatJSONResponse({
            message: "Invalid password"
        }) 

    const sessionRepo = new SessionsRepository();
    const createdSession = await sessionRepo.createSession({user_name: foundUser[0].user_name, session_id: UUID4()})
    
    return formatJSONResponse({
        createdSession            
    });
};


export const Login = middyfy(login);