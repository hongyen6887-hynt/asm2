import { NextResponse } from "next/server";
const URL = "http://localhost:3001/products";

export async function PUT(req, { params }) {
  const body = await req.json();
  const res = await fetch(`${URL}/${params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await res.json());
}

export async function DELETE(req, { params }) {
  await fetch(`${URL}/${params.id}`, { method: "DELETE" });
  return NextResponse.json({ message: "Deleted" });
}