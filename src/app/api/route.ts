import { NextResponse } from "next/server";

export async function POST(request: Request) {
  console.log(request);
  console.log(request.body);
  const response = await fetch(`${process.env.NEXT_PUBLIC_GEIST_SERVER}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => console.log(response));

  return Response.json("");
}
