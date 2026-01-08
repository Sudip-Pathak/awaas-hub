import "dotenv/config";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { nextCookies } from "better-auth/next-js";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db();

const secret = process.env.BETTER_AUTH_SECRET;
if (!secret) throw new Error("❌ BETTER_AUTH_SECRET not defined");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  secret,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },

  plugins: [nextCookies()],
  user: {
    additionalFields: {
      role: {
        type: "string",
        default: null,
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
