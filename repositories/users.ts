import type { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { UserInterface } from "@models/users";
import * as AWS from 'aws-sdk';

export class UsersRepository {
    constructor(
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly usersTable = 'users',
    ) {}
    
    async getUser(email_address: string): Promise<UserInterface[]>{
        const response = await this.docClient.query({
            ExpressionAttributeValues: {
                ":email_address":  email_address                
            },
            KeyConditionExpression: "email_address = :email_address",
            TableName: this.usersTable,
            IndexName: "email-index"
        }).promise()
        return response.Items as UserInterface[];
    }
    
}