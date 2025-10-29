import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";

interface SearchPageProps {
  searchParams: Promise<{ query?: string }>;
}

// ✅ Handle async searchParams (Next.js 15+ expects a Promise)
export async function generateMetadata(
  { searchParams }: SearchPageProps
): Promise<Metadata> {
  const params = await searchParams;
  const query = params?.query || "";

  return {
    title: query ? `Search: ${query} - Flowmazon` : "Search - Flowmazon",
  };
}

export default async function SearchPage(
  { searchParams }: SearchPageProps
) {
  const params = await searchParams;
  const query = params?.query || "";

  // ✅ Early exit if query is empty
  if (!query) {
    return <div className="text-center">Please enter a search term.</div>;
  }

  // ✅ Prisma query
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  // ✅ Handle no results
  if (products.length === 0) {
    return <div className="text-center">No products found for "{query}".</div>;
  }

  // ✅ Display results
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}
