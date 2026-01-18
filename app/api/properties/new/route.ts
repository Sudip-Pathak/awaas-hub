import {
  badRequest,
  forbidden,
  internalServerError,
  unauthorized,
} from "@/lib/error";
import { Property } from "@/lib/models/Property";
import { hasPermission, Permission, Role } from "@/lib/rbac";
import { getServerSession } from "@/lib/server/getSession";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

/**
 * POST /api/properties
 * - Only seller with MANAGE_PROPERTIES can create
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) return unauthorized();

    const role = session.user.role as Role;
    if (!hasPermission(role, Permission.MANAGE_PROPERTIES)) {
      return forbidden();
    }

    const body = await req.json();
    const { title, price, location } = body;

    if (!title || !price || !location) {
      return badRequest("All fields are required");
    }

    const property = await Property.create({
      title,
      price,
      location,
      sellerId: new mongoose.Types.ObjectId(session.user.id),
      status: "available",
    });

    return NextResponse.json(property, { status: 201 });
  } catch (err) {
    console.error(err);
    return internalServerError();
  }
}
