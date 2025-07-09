import configPromise from '@payload-config'
import { getPayload } from 'payload'

import React from "react";
import { Navbar } from "./navbar";
import { Footer } from "./fotter";
import { SearchFilters } from "./search-filters"
import { Category } from '@/payload-types';

interface Props {
  children: React.ReactNode;
}
const Layout = async ({ children }: Props) => {
  try {
      const payload = await getPayload({
        config: configPromise,
      })
  
      const data = await payload.find({
        collection: "categories",
        pagination: false,
        depth: 1,
        where: {
          parent: {
            exists: false
          }
        }
      })

      const formattedData = data.docs.map((doc) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
          // Because of 'depth: 1' we are confident doc will be a type of category
          ...(doc as Category),
          subcategories: undefined,
        })),
      }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );

} catch ( error ) {
  return (
    <div>
      <p>
        Error loading categories:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </p>
    </div>
  );
}
}

export default Layout;
