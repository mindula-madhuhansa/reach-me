import HeroForm from "@/components/forms/hero-form";

export default function Home() {
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

        <HeroForm />
      </section>
    </main>
  );
}
