import { authRouter } from "@/modules/auth/server/procedures";
import { createTRPCRouter } from "../init";
import { categoriesRouter } from "@/modules/categories/server/procedure";
import { productsRouter } from "@/modules/products/server/procedure";
import { tagsRouter } from "@/modules/tags/server/procedure";
import { tenantsRouter } from "@/modules/tenants/server/procedure";
import { checkoutRouter } from "@/app/(app)/(tenants)/tenants/[slug]/(checkout)/server/procedure";
import { libraryRouter } from "@/modules/library/server/procedure";
import { reviewsRouter } from "@/modules/reviews/server/procedure";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  categories: categoriesRouter,
  products: productsRouter,
  tags: tagsRouter,
  tenants: tenantsRouter,
  checkout: checkoutRouter,
  library: libraryRouter,
  reviews: reviewsRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;
