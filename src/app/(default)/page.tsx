import { getServerSession } from "next-auth";

import HeroForm from "@/components/forms/hero-form";
import { authOptions } from "@/libs/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <section className="pt-32">
        <div className="max-w-sm lg:max-w-lg mb-4">
          <h1 className="text-5xl lg:text-6xl font-bold">
            Your one link
            <br />
            for everything
          </h1>
          <h2 className="text-gray-500 text-lg lg:text-xl mt-4">
            Share your links, social profiles, contact info and more on one
            place
          </h2>
        </div>

        <HeroForm user={session?.user} />
      </section>
    </main>
  );
}
