import { Client, Account, Databases, ID } from "appwrite";

// Get environment variables with fallbacks
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '';
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID || '';

console.log('Appwrite Config:', { endpoint, projectId, databaseId, collectionId });

// Create client with proper configuration
export const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export { ID, databaseId, collectionId };
