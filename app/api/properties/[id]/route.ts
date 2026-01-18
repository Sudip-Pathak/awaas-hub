import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { Property } from "@/lib/models/Property";
import { Role, Permission, hasPermission } from "@/lib/rbac";
import { getServerSession } from "@/lib/server/getSession";
import {
  badRequest,
  forbidden,
  notFound,
  internalServerError,
  unauthorized,
} from "@/lib/error";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return unauthorized();

  const role = session.user.role as Role;

  if (!hasPermission(role, Permission.VIEW_PROPERTIES)) {
    return forbidden();
  }

  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return badRequest("Invalid property ID");
  }

  try {
    const property = await Property.findById(id);
    if (!property) return notFound("Property not found");

    // Only seller can see their own private properties, others only view basic info
    if (
      role === Role.SELLER &&
      property.sellerId.toString() !== session.user.id
    ) {
      return forbidden();
    }

    return NextResponse.json(property);
  } catch (err) {
    console.error(err);
    return internalServerError();
  }
}

// PUT - Edit property
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return unauthorized();

  const role = session.user.role as Role;
  if (!hasPermission(role, Permission.MANAGE_PROPERTIES)) return forbidden();

  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) return badRequest("Invalid ID");

  try {
    const property = await Property.findById(id);
    if (!property) return notFound();

    // Only admin or property owner
    if (
      role !== Role.ADMIN &&
      property.sellerId.toString() !== session.user.id
    ) {
      return forbidden();
    }

    const body = await req.json();
    const updated = await Property.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(updated);
  } catch (err) {
    return internalServerError();
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession();
  if (!session?.user) return unauthorized();

  const role = session.user.role as Role;
  if (!hasPermission(role, Permission.MANAGE_PROPERTIES)) return forbidden();

  const { id } = await params;
  if (!mongoose.Types.ObjectId.isValid(id)) return badRequest("Invalid ID");

  try {
    const property = await Property.findById(id);
    if (!property) return notFound();

    // Only admin or property owner
    if (
      role !== Role.ADMIN &&
      property.sellerId.toString() !== session.user.id
    ) {
      return forbidden();
    }

    await Property.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    return internalServerError();
  }
}
