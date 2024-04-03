import { Event } from "@/db/models/Event";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  mongoose.connect(process.env.MONGODB_URI!);

  const url = new URL(req.url);
  const clickedLinkParam = url.searchParams.get("url");
  const page = url.searchParams.get("page");

  if (clickedLinkParam !== null) {
    const clickedLink = atob(clickedLinkParam);
    await Event.create({ type: "click", uri: clickedLink, page });
    return NextResponse.json(true, { status: 200 });
  } else {
    return NextResponse.json(false, { status: 400 });
  }
}
