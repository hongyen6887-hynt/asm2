import { NextResponse } from "next/server";
const URL = "https://my-json-server.typicode.com/hongyen6887-hynt/sunktea-api/orders";

export async function PATCH(req, { params }) {
  const body = await req.json();
  const res = await fetch(`${URL}/${params.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return NextResponse.json(await res.json());
}