"use client";

import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { ReviewSidebar } from "../components/review-sidebar";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Suspense } from "react";
import { ReviewFormSkeleton } from "../components/review-form";

interface Props {
  productId: string;
}

export const ProductView = ({ productId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.library.getOne.queryOptions({
      productId,
    })
  );
  return (
    <div className="min-h-screen bg-white">
      <nav className="p-4 bg-[#F4F4F0] w-full border-b">
        <Link prefetch href="/library" className="flex items-center gap-2">
          <ArrowLeftIcon className="size-4" />
          <span className="text font-medium">Back to Library</span>
        </Link>
      </nav>
      <header className="bg-[#F4F4F0] py-8 border-b">
        <div className="mx-auto px-4 lg:px-12">
          <h1 className="text-[40px] font-medium">{data.name}</h1>
        </div>
      </header>
      <section className="mx-auto px-4 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
          <div className="lg:col-span-2">
            <div className="p-4 bg-white rounded-md gap-4">
              <Suspense fallback={<ReviewFormSkeleton />}>
                <ReviewSidebar productId={productId} />
              </Suspense>
            </div>
          </div>
          <div className="lg:col-span-5">
            {data.content ? (
              <RichText data={data.content} />
            ) : (
              <p className="font-medium italic bg-muted-foreground">
                No Special Content
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export const ProductViewSkeleton = () => {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Top Navigation */}
      <nav className="p-4 bg-[#F4F4F0] w-full border-b">
        <div className="flex items-center gap-2">
          <div className="size-4 bg-gray-300 rounded" />
          <div className="h-4 w-32 bg-gray-300 rounded" />
        </div>
      </nav>

      {/* Header */}
      <header className="bg-[#F4F4F0] py-8 border-b">
        <div className="mx-auto px-4 lg:px-12">
          <div className="h-10 w-3/4 bg-gray-300 rounded" />
        </div>
      </header>

      {/* Main Section */}
      <section className="mx-auto px-4 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-16">
          {/* Sidebar */}
          <div className="lg:col-span-2">
            <div className="p-4 bg-white rounded-md gap-4">
              <div className="flex flex-col gap-4">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="flex items-center gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="w-6 h-6 bg-gray-200 rounded" />
                  ))}
                </div>
                <div className="h-24 bg-gray-200 rounded" />
                <div className="h-10 w-28 bg-gray-200 rounded" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              <div className="h-4 w-full bg-gray-200 rounded" />
              <div className="h-4 w-5/6 bg-gray-200 rounded" />
              <div className="h-4 w-4/6 bg-gray-200 rounded" />
              <div className="h-4 w-3/6 bg-gray-200 rounded" />
              <div className="h-4 w-2/6 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
