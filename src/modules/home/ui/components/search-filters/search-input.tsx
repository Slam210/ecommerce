import { Input } from "@/components/ui/input";
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from "lucide-react";
import { CategoriesSidebar } from "./categories-sidebar";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
  disabled?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export const SearchInput = ({ defaultValue, onChange, disabled }: Props) => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  const [searchInput, setSearchInput] = useState(defaultValue ?? "");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onChange?.(searchInput);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchInput, onChange]);

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar
        open={isSidebarOpened}
        onOpenChange={setIsSidebarOpened}
      />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8"
          placeholder="Search Products"
          disabled={disabled}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <Button
        variant={"elevated"}
        className="size-12 shrink-0 flex lg:hidden"
        onClick={() => setIsSidebarOpened(true)}
      >
        <ListFilterIcon />
      </Button>
      {session.data?.user && (
        <Button variant={"elevated"} asChild>
          <Link prefetch href="/library">
            <BookmarkCheckIcon className="mr-2" />
          </Link>
        </Button>
      )}
    </div>
  );
};
