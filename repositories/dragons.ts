import type { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { DragonInterface } from "@models/dragon";
import * as AWS from 'aws-sdk';

export class DragonsRepository {
    constructor(
        private readonly docClient: DocumentClient = new AWS.DynamoDB.DocumentClient(),
        private readonly dragonsTable = "dragons" //process.env.DRAGONS_TABLE,
    ) {}
    
    async getAllDragons(): Promise<DragonInterface[]> {
        const response = await this.docClient.scan({
            TableName: this.dragonsTable
        }).promise()
        return response.Items as DragonInterface[];        
    }
    
}