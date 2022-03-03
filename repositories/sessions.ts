import type { DocumentClient } from "aws-sdk/clients/dynamodb";
import { SessionInterface } from "@models/session";
import * as AWS from "aws-sdk";


export class SessionsRepository {
    constructor(
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly sessionTable: string = "sessions",
        private readonly timeOutMinutes: number = 20
    ){}

    async createSession(user_session: SessionInterface){
        const params = {
                Item: {
                    "session_id":  user_session.session_id, 
                    "user_name": user_session.user_name, 
                    "expiration_time": (Math.floor((new Date).getTime()/1000) + (60 * this.timeOutMinutes)).toString()                    
                }, 
                ReturnConsumedCapacity: "TOTAL", 
                TableName: this.sessionTable
         };
         return await this.docClient.put(params).promise();
    }

}