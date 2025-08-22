import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("productApp");
  const products = await db.collection("products").find({}).toArray();
  return NextResponse.json(products);
}

export async function POST(req) {
  const client = await clientPromise;
  const db = client.db("productApp");
  const body = await req.json();
  const newProduct = {
    name: body.name,
    description: body.description || "No description",
    price: body.price,
    image: body.image || "",
  };
  const result = await db.collection("products").insertOne(newProduct);
  return NextResponse.json({ success: true, product: result });
}
