import { Media, Tenant } from "@/payload-types";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";
import { DEFAULT_LIMIT } from "@/constants";

export const libraryRouter = createTRPCRouter({
  getMany: protectedProcedure
    .input(
      z.object({
        cursor: z.number().default(1),
        limit: z.number().default(DEFAULT_LIMIT),
      })
    )
    .query(async ({ ctx, input }) => {
      const orderData = await ctx.payload.find({
        collection: "orders",
        depth: 1, // Include product data directly
        where: {
          user: {
            equals: ctx.session.user.id,
          },
        },
        page: input.cursor,
        limit: input.limit,
      });

      return {
        ...orderData,
        docs: orderData.docs.map((order) => ({
          ...order.product,
          image: order.product.image as Media | null,
          tenant: order.product.tenant as Tenant & { image: Media | null },
        })),
      };

      return {
        ...productsData,
        docs: productsData.docs.map((doc) => ({
          ...doc,
          image: doc.image as Media | null,
          tenant: doc.tenant as Tenant & { image: Media | null },
        })),
      };
    }),
});
