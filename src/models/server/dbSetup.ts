import { db } from "../name";
import { databases } from "./config";


// Create all collections
import createAnswerCollection from "./answer.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";



export default async function getOrCreateDB() {
   try {
     // In first step, we will connect to the database
     await databases.get(db);
     console.log("Database Connected");

     // Notes: if no database is found, it will throw an error mean it create a new database
        
   } catch (error) {
     try {
        await databases.create(db, db);
        console.log("Database Created");

        // Creating all collections
        await Promise.all([
            createQuestionCollection(),
            createAnswerCollection(),
            createVoteCollection(),
            createCommentCollection(),
        ]);
        console.log("Collections Created");
        console.log("Database Setup Completed");
     } catch (error) {
        console.error("Error in Creating Database or Collections", error);
     }
   }

   return databases;
}
