"use client";

import { NavbarHome } from "./navbar";
import { TemplatesGallery } from "./templates-gallery";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import FullScreenLoader from "@/components/fullscreenLoader";
import { DocumentsTable } from "./documents-table";
import { useSearchParam } from "@/hooks/use-search-param";

export default function Home() {
  const [search] = useSearchParam();
  const {results,status, loadMore} = usePaginatedQuery(api.documents.get,{search},{initialNumItems:5});
  if (results === undefined) {
    return <FullScreenLoader />;
  }

  return (
    <div className="flex flex-col gap-2 min-h-screen">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white !p-4">
        <NavbarHome />
      </div>
      <div className="!mt-16 ">
        <TemplatesGallery />
        <DocumentsTable documents = {results} status = {status} loadMore = {loadMore}/>
      </div>
    </div>
  );
}
