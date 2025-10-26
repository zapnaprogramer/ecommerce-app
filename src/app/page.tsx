import PaginationBar from "@/components/PaginationBar";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

// ✅ Use "any" for compatibility with Next.js internal PageProps type
export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<any> | undefined;
}) {
  // Next.js sometimes passes it as a plain object, so we normalize it
  const resolvedParams =
    searchParams instanceof Promise
      ? await searchParams
      : searchParams
      ? (searchParams as Record<string, string>)
      : {};

  const page = resolvedParams.page ?? "1";
  const currentPage = parseInt(page);

  const pageSize = 6;
  const heroItemCount = 1;

  const totalItemCount = await prisma.product.count();
  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  return (
    <div className="flex flex-col items-center">
      {/* Hero section */}
      {currentPage === 1 && products.length > 0 && (
        <div className="hero rounded-xl bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={products[0].imageUrl}
              alt={products[0].name}
              width={400}
              height={800}
              className="w-full max-w-sm rounded-lg shadow-2xl"
              priority
            />
            <div>
              <h1 className="text-5xl font-bold">{products[0].name}</h1>
              <p className="py-6">{products[0].description}</p>
              <Link
                href={`/products/${products[0].id}`}
                className="btn btn-primary"
              >
                Check it out
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(currentPage === 1 ? products.slice(1) : products).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <PaginationBar currentPage={currentPage} totalPages={totalPages} />
      )}
    </div>
  );
}
