import { NextRequest, NextResponse } from "next/server";

// ### (Optional) Phase #3
export async function POST(request: NextRequest) {
  return NextResponse.json({ message: "Hello, world!" });
}
