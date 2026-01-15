// app/api/update-role/route.ts
import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { role, userId } = body;

        // 1️⃣ Basic validation
        if (!role || typeof role !== "string" || !userId || typeof userId !== "string") {
            return NextResponse.json(
                { message: "role and userId are required and must be strings" },
                { status: 400 }
            );
        }

        // 2️⃣ Validate ObjectId
        if (!ObjectId.isValid(userId)) {
            return NextResponse.json({ message: "Invalid userId" }, { status: 400 });
        }

        // 3️⃣ Get the database
        const db = await getDatabase(); // uses cached connection if available
        const usersCollection = db.collection("user");

        // 🔹 Debug: print basic info
        console.log("🟢 POST /api/update-role hit");
        console.log("userId from request:", userId);
        console.log("db database name:", db.databaseName);

        // 🔹 Debug: print first 3 users (helps confirm collection)
        const sampleUsers = await usersCollection.find({}).limit(3).toArray();
        console.log("Sample users in DB:", sampleUsers);

        // 4️⃣ Find the user by _id
        const objectId = new ObjectId(userId);
        const user = await usersCollection.findOne({ _id: objectId });

        if (!user) {
            // If user not found, try searching by string id
            const userStringId = await usersCollection.findOne({ _id: objectId });
            if (userStringId) {
                console.warn("⚠️ User found with string id, not ObjectId!");
                return NextResponse.json(
                    { message: "User id stored as string in DB. Use string _id." },
                    { status: 400 }
                );
            }

            console.warn("⚠️ User not found for ObjectId:", objectId);
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        console.log("Found user:", user);

        // 5️⃣ Check if role already matches
        if (user.role === role.trim()) {
            console.log("Role already set:", role);
            return NextResponse.json({ message: "Role already set" }, { status: 200 });
        }

        // 6️⃣ Update role
        const updateResult = await usersCollection.updateOne(
            { _id: objectId },
            { $set: { role: role.trim() } }
        );

        console.log("Update result:", updateResult);

        return NextResponse.json({ message: "Role updated successfully", role: user.role }, { status: 200 });
    } catch (err: any) {
        console.error("❌ Failed to update role:", err);
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
