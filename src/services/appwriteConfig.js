import { Account, Client, Databases } from "appwrite";

export const API_ENDPOINT = "https://cloud.appwrite.io/v1"
export const PROJECT_ID = "6592ba5dd242eccf4838"
export const DATABASE_ID = '659a786ec3cf1d2c96cc'
export const COLLECTION_ID_MESSAGES = '659a7882859d05774826'
    
const client = new Client()
    .setEndpoint(API_ENDPOINT)
    .setProject(PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);

export default client;
