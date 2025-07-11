import { initTRPC } from "@trpc/server";
import { cache } from "react";
import config from "@payload-config";
import { getPayload } from "payload";
import superjson from "superjson"

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  // TODO: Implement proper authentication
  // Example with Next.js auth or session management:
  // const session = await getServerSession();
  // return { userId: session?.user?.id ?? null };
  throw new Error("Authentication context not implemented");
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure.use(async ({ next }) => {
  const payload = await getPayload({ config });

  return next({ ctx: { payload } });
});
