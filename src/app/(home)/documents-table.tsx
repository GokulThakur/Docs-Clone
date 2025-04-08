"use client"
import { PaginationStatus, useMutation } from "convex/react";
import { Doc, Id } from "../../../convex/_generated/dataModel";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Building2Icon, CircleUserIcon, LoaderIcon, PencilIcon, TrashIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { api } from "../../../convex/_generated/api";
import {SiGoogledocs} from "react-icons/si"


interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
}

export const DocumentsTable = ({
  documents,
}: DocumentsTableProps) => {

    const removeDocument = useMutation(api.documents.deleteDocument)
    const onDeleteClick = (id: Id<"documents">) => {
      removeDocument({id})
    };

    const getDocumentById = (id : Id<"documents"> ) =>{
      window.open(`/documents/${id}`,"_blank")
    }
  return (
    <div className="!max-w-screen-xl !mx-auto !px-16 !py-6 flex flex-col gap-5">
      {documents === undefined ? (
        <div className="flex justify-center items-center h-24">
          <LoaderIcon className="animate-spin text-muted-foreground size-5" />
        </div>
      ) : (
        <Table className="border-separate border-spacing-y-4">
          {(documents.length>0) && <TableCaption className="h-24 !py-4 text-center text-muted-foreground">A list of your recent documents.</TableCaption>}
          <TableHeader>
            <TableRow className="hover:bg-transparent border-none">
              <TableHead>Document Name</TableHead>
              <TableHead className=" hidden sm:table-cell">Shared</TableHead>
              <TableHead className=" hidden sm:table-cell">Created At</TableHead>
              <TableHead>Modify</TableHead>
            </TableRow>
          </TableHeader>
          {documents.length === 0 ? (
            <TableBody>
                <TableRow className="hover:bg-transparent border-none">
                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                        No Documents Found
                    </TableCell>
                </TableRow>
            </TableBody>
          ):(
            <TableBody>
            {documents?.map(({ _id, title, _creationTime , organizationId }) => (
              <TableRow className="hover:bg-transparent border-none" key={_id}>
                <TableCell className="font-medium md:w[45%] flex gap-3 items-center"><SiGoogledocs className="size-6 fill-blue-500"/>{title}</TableCell>
                <TableCell className="text-muted-foreground items-center gap-2 hidden sm:table-cell ">
                  <span className="flex flex-1 gap-1.5 !-ml-3 items-center">
                  {organizationId ?<Building2Icon className="size-4"/>:<CircleUserIcon className="size-4"/>}
                  {organizationId?"Organization":"Personal"}                    
                  </span>
                </TableCell>
                <TableCell className=" hidden sm:table-cell">{formatDistanceToNow(_creationTime, { addSuffix: true })}</TableCell>
                <TableCell className="flex gap-x-3"><TrashIcon onClick={() => onDeleteClick(_id)} className="size-4 cursor-pointer"/><PencilIcon onClick={()=> getDocumentById(_id)} className="size-4 cursor-pointer"/></TableCell>
              </TableRow>
            ))}
          </TableBody>
          )}
          
        </Table>
      )}
    </div>
  );
};
