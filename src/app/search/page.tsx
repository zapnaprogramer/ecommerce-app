import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";

type MaybeSearchParams = Record<string, string | string[]> | undefined;
type SearchPageProps = {
  searchParams?: MaybeSearchParams | Promise<MaybeSearchParams>;
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: MaybeSearchParams | Promise<MaybeSearchParams>;
}): Promise<Metadata> {
  const resolvedParams: MaybeSearchParams =
    searchParams instanceof Promise ? await searchParams : searchParams ?? {};

  const queryValue = Array.isArray(resolvedParams?.query)
    ? resolvedParams?.query[0]
    : (resolvedParams?.query as string | undefined);

  const query = queryValue ?? "";

  return {
    title: `Search: ${query} - Flowmazon`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams: MaybeSearchParams =
    searchParams instanceof Promise ? await searchParams : searchParams ?? {};

  const queryValue = Array.isArray(resolvedParams?.query)
    ? resolvedParams?.query[0]
    : (resolvedParams?.query as string | undefined);

  const query = queryValue ?? "";

  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (products.length === 0) {
    return <div className="text-center">No products found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}