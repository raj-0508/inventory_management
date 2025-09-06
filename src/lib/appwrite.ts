import { Client, Account, ID } from "appwrite";

// Get environment variables with fallbacks
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '';

console.log('Appwrite Config:', { endpoint, projectId });

// Create client with proper configuration
export const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId);

export const account = new Account(client);
export { ID };
