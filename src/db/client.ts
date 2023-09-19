import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {DynamoDBDocumentClient} from "@aws-sdk/lib-dynamodb";

let docClient: DynamoDBDocumentClient = null;

export const getDocClient = (): DynamoDBDocumentClient => {
    if (docClient) {
        return docClient;
    }

    const client = new DynamoDBClient();
    docClient = DynamoDBDocumentClient.from(client);

    return docClient;
}
