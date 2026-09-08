import { MongoClient, MongoClientOptions } from "mongodb";

if (!process.env.MONGO_DB_URI) {
  throw new Error("Missing MONGO_DB_URI environment variable");
}

const uri = process.env.MONGO_DB_URI;
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  // Reuse the client across hot reloads in dev
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, each serverless invocation gets its own client,
  // but this still avoids re-instantiating within a warm instance.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Convenience helper to grab a specific database
export async function getDb(dbName?: string) {
  const c = await clientPromise;
  return c.db(dbName);
}
