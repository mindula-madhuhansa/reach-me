import mongoose from "mongoose";
import { Link21 } from "iconic-react";

import SectionBox from "@/components/section-box";
import Chart from "@/components/chart";
import { Event } from "@/db/models/Event";
import { IPage } from "@/types/Page";
import { getPageDetails } from "@/utils/getPageDetails";
import Link from "next/link";
import { isToday } from "date-fns";

export default async function ReachPage() {
  mongoose.connect(process.env.MONGODB_URI!);

  const page = (await getPageDetails()) as IPage;

  const viewsList = await Event.aggregate([
    {
      $match: {
        type: "view",
        uri: page.uri,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },
        count: {
          $count: {},
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const clicks = await Event.find({
    page: page.uri,
    type: "click",
  });

  return (
    <>
      <SectionBox>
        <div className="p-4">
          <h2 className="text-xl font-medium text-center mb-6 text-blue-500">
            Views
          </h2>
          <Chart
            data={viewsList.map((o) => ({
              date: o._id,
              views: o.count,
            }))}
          />
        </div>
      </SectionBox>

      <SectionBox>
        <div className="p-4">
          <h2 className="text-xl font-medium text-center mb-6 text-blue-500">
            Clicks
          </h2>

          {page.links.map((link) => (
            <div
              key={link.id}
              className="flex flex-col lg:flex-row gap-6 items-center text-center lg:text-start border-t border-gray-300 py-4"
            >
              <div className="text-blue-500 hidden lg:block">
                <Link21 />
              </div>

              <div className="min-w-[80%] lg:border-r-2">
                <h3 className="font-medium">{link.title || "No title"}</h3>
                <p className="text-gray-500 text-xs">
                  {link.subtitle || "No Subtitle"}
                </p>
                <Link
                  target="_blank"
                  href={link.url}
                  className="text-xs text-blue-500"
                >
                  {link.url}
                </Link>
              </div>

              <div className="flex justify-center items-center text-center gap-4 text-neutral-500 text-sm mt-4 lg:mt-0">
                <div className="border border-gray-300 p-2 px-4 rounded-md">
                  <span className="text-xl text-black font-medium">
                    {
                      clicks.filter(
                        (click) =>
                          click.uri === link.url && isToday(click.createdAt)
                      ).length
                    }
                  </span>
                  <h3 className="text-xs mt-1">Today Clicks</h3>
                </div>
                <div className="border border-gray-300 p-2 px-4 rounded-md">
                  <span className="text-xl text-black font-medium">
                    {clicks.filter((click) => click.uri === link.url).length}
                  </span>
                  <h3 className="text-xs mt-1">Total Clicks</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionBox>
    </>
  );
}
