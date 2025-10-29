"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    // Simulate fetching search results
    if (query) {
      const fakeResults = ["apple", "banana", "orange", "grape"].filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setResults(fakeResults);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Search Results
      </h1>

      {query ? (
        results.length > 0 ? (
          <ul className="list-disc list-inside space-y-2">
            {results.map((item, index) => (
              <li key={index} className="text-gray-700">
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">
            No results found for &quot;{query}&quot;
          </p>
        )
      ) : (
        <p className="text-gray-500">
          Please enter a search term.
        </p>
      )}
    </main>
  );
}
