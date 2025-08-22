import Link from "next/link";

export default function Banner() {
  return (
    <section className="relative w-full h-[500px]">
      {/* Image and overlay wrapper */}
      <div className="absolute inset-0">
        <img
          src="/ferrari.jpg"
          alt="Ferrari"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
          Welcome to ProductApp
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl drop-shadow-md">
          Discover amazing products and manage them easily with our platform.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <Link
            href="/products"
            className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            View Products
          </Link>
        </div>
      </div>
    </section>
  );
}
