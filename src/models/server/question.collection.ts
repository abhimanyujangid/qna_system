import { IndexType } from "node-appwrite";
import {db, questionCollection} from "../name";
import {databases} from "./config";
import { Permission } from "appwrite";

export default async function createQuestionCollection() {
    // Create a new collection
    await databases.createCollection(db, questionCollection, questionCollection,[
        //permissions for the collection
        Permission.read("any"),
        Permission.read("users"),
        Permission.create("users"),
        Permission.update("users"),
        Permission.delete("users")
    ]);
    console.log(`Collection ${questionCollection} created`);

    // Create attributes and index
    await Promise.all(
        [
            databases.createStringAttribute(db, questionCollection, "title",100, true),
            databases.createStringAttribute(db, questionCollection, "content", 1000, true),
            databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
            databases.createStringAttribute(db, questionCollection, "tags", 50, true, undefined, true),
            databases.createStringAttribute(db, questionCollection, "attachmentId", 50, false),            
        ]
    );
    console.log(`Attributes created for ${questionCollection}`);

    // create index
    await Promise.all(
        [
            databases.createIndex(db, questionCollection, "title", IndexType.Fulltext, ["title"], ['asc']),
            databases.createIndex(db, questionCollection, "content", IndexType.Fulltext, ["content"], ['asc']),
        ]
    );
    console.log(`Index created for ${questionCollection}`);
}
