import * as mongoDB from "mongodb";
import dbConfig from "../config/mongo";
import env from "../config/environment";
import dotenv from "dotenv";
dotenv.config({ path: `.env.${env.NODE_ENV}` }); 

let dbcon_url:(string | undefined)=process.env.MONGO_URI

export class MongoService {
    static async collectionDetails(type:any) {
        if(dbcon_url) {
            let client = new mongoDB.MongoClient(
                dbcon_url
            );
            await client.connect();
            let db = client.db(dbConfig.databaseName);
            var collection = db.collection(dbConfig.collection.user);
            switch (type) {
                case "user":
                    collection = db.collection(dbConfig.collection.user);
                    break;
                case "job":
                    collection = db.collection(dbConfig.collection.job);
                    break;
                default:
                    break;
            }
            return {
                client: client,
                connection: collection,
            };
        }
    }
}
