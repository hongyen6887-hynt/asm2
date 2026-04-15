import { NextResponse } from "next/server";
const URL = "http://localhost:3001/orders";

export async function PATCH(req, { params }) {
  const body = await req.json();
  const res = await fetch(`${URL}/${params.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await res.json());
}