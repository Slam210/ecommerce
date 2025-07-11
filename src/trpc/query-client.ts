import {
  defaultShouldDehydrateQuery,
  QueryClient,
} from "@tanstack/react-query";
import superjson from "superjson"

/**
 * Creates and returns a new QueryClient instance with custom default options for query caching, serialization, and hydration.
 *
 * The client is configured to:
 * - Treat query data as fresh for 30 seconds.
 * - Use superjson for serializing and deserializing query data during dehydration and hydration.
 * - Dehydrate queries that are either normally dehydrated by default or have a status of "pending".
 *
 * @returns A configured QueryClient instance.
 */
export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
      },
      dehydrate: {
        serializeData: superjson.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: superjson.deserialize,
      },
    },
  });
}
