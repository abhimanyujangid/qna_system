import { Client, Account, Avatars, Databases, Storage } from "appwrite";
import env from "@/app/env";

const client = new Client()
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectid); // Your project ID

    // Set the API Key
    const databases = new Databases(client);
    const account = new Account(client);
    const avatars = new Avatars(client);
    const storage = new Storage(client);




export { client, databases, account, avatars, storage };