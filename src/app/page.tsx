import Header from "@/components/header";

export default function Home() {
  return (
    <main>
      <Header />

      <section className="p-6 pt-32 max-w-7xl mx-auto">
        <div className="max-w-sm lg:max-w-md mb-4">
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

        <form className="inline-flex items-center shadow-lg shadow-gray-500/20">
          <span className="bg-white py-2 lg:py-4 pl-4">reach.me/</span>
          <input
            type="text"
            placeholder="username"
            className="outline-none py-2 lg:py-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 lg:p-4 lg:px-6 text-xs lg:text-base"
          >
            Join for Free
          </button>
        </form>
      </section>
    </main>
  );
}
