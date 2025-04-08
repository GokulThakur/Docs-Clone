"use client";

import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./document-input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/menubar";
import {
  BoldIcon,
  Clipboard,
  CopyIcon,
  FileIcon,
  FileJson2Icon,
  FilePlusIcon,
  Globe2Icon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  ScissorsIcon,
  StrikethroughIcon,
  TableIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/store/editor-store";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { editor } = useEditorStore();

  const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows, cols, withHeaderRow: true })
      .run();
  };

  const handleCut = async () => {
    if (!editor) {
      return;
    }
    const { from, to } = editor.state.selection;
    const text = await editor.state.doc.textBetween(from, to, " ");
    navigator.clipboard.writeText(text);
    editor?.chain().focus().deleteSelection().run();
  };
  const handleCopy = async () => {
    if (!editor) {
      return;
    }
    const { from, to } = editor.state.selection;
    const text = await editor.state.doc.textBetween(from, to, " ");
    navigator.clipboard.writeText(text);
  };
  const handlePaste = async () => {
    if (!editor) {
      return;
    }
    const text = await navigator.clipboard.readText();
    editor?.chain().focus().insertContent(text).run();
  };

  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const onSaveJson = () => {
    if (!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });
    onDownload(blob, `document.json`); //customise when create database
  };
  const onSaveHTML = () => {
    if (!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: "text/html",
    });
    onDownload(blob, `document.html`); //customise when create database
  };
  const onSaveText = () => {
    if (!editor) return;
    const content = editor.getText();
    const blob = new Blob([content], {
      type: "text/plain",
    });
    onDownload(blob, `document.txt`); //customise when create database
  };

  const create = useMutation(api.documents.create);
  const router = useRouter();
  const handleCreate = (title : string , initialContent : string) => {
    create({title , initialContent}).then((documentId)=>{
      router.push(`/documents/${documentId}`)
    }).catch((error)=>{
      console.log(error)
    })
  }
  return (
    <nav className="flex items-center justify-between !p-2">
      <div className="flex gap-2 items-center !px-3">
        <Link href={"/"}>
          <Image
            src="/logo.svg"
            alt="Logo"
            width={36}
            height={36}
            className="mr-2"
          />
        </Link>
        <div className="flex flex-col">
          {/* document input */}
          <DocumentInput />
          {/* menu bar */}
          <div className="flex">
            <Menubar className=" gap-5 border-none bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent className=" print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger className="!p-2.5 flex gap-2 justify-start items-center">
                      <FileIcon className="size-4 mr-2" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        className="!p-2.5 flex gap-2 justify-center items-center"
                        onClick={onSaveJson}
                      >
                        <FileJson2Icon className="size-4 mr-2" />
                        JSON
                      </MenubarItem>
                      <MenubarItem
                        className="!p-2.5 flex gap-2 justify-center items-center"
                        onClick={onSaveHTML}
                      >
                        <Globe2Icon className="size-4 mr-2" />
                        HTML
                      </MenubarItem>
                      <MenubarItem
                        className="!p-2.5 flex gap-2 justify-center items-center"
                        onClick={() => window.print()}
                      >
                        <BsFilePdf className="size-4 mr-2" />
                        PDF
                      </MenubarItem>
                      <MenubarItem
                        className="!p-2.5 flex gap-2 justify-center items-center"
                        onClick={onSaveText}
                      >
                        <TextIcon className="size-4 mr-2" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={()=>handleCreate("New Document" , "Hello Blank")} className="!p-2.5">
                    <FilePlusIcon className="size-4 mr-2" />
                    New Document
                  </MenubarItem>
                  <MenubarSeparator />
                  {/* <MenubarItem className="!p-2.5">
                    <FileEditIcon className="size-4 mr-2" />
                    Rename
                  </MenubarItem> */}
                  <MenubarItem className="!p-2.5">
                    <TrashIcon className="size-4 mr-2" />
                    Remove
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem
                    className="!p-2.5"
                    onClick={() => window.print()}
                  >
                    <PrinterIcon className="size-4 mr-2" />
                    Print
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    className="!p-2.5"
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2Icon className="size-4 mr-2" />
                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    className="!p-2.5"
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2Icon className="size-4 mr-2" />
                    Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem className="!p-2.5" onClick={handleCut}>
                    <ScissorsIcon className="size-4 mr-2" />
                    Cut
                  </MenubarItem>
                  <MenubarItem className="!p-2.5" onClick={handleCopy}>
                    <CopyIcon className="size-4 mr-2" />
                    Copy
                  </MenubarItem>
                  <MenubarItem className="!p-2.5" onClick={handlePaste}>
                    <Clipboard className="size-4 mr-2" />
                    Paste
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger className="!p-2.5 flex gap-2 justify-start items-center">
                      <FileIcon className="size-4 mr-2" />
                      Tables
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        className="!p-2.5 flex gap-2 justify-center items-center"
                        onClick={() => insertTable({ rows: 1, cols: 1 })}
                      >
                        <TableIcon className="size-4 mr-2" />1 x 1
                      </MenubarItem>
                      <MenubarItem
                        className="!p-2.5 flex gap-2 justify-center items-center"
                        onClick={() => insertTable({ rows: 2, cols: 2 })}
                      >
                        <TableIcon className="size-4 mr-2" />2 x 2
                      </MenubarItem>
                      <MenubarItem
                        className="!p-2.5 flex gap-2 justify-center items-center"
                        onClick={() => insertTable({ rows: 3, cols: 3 })}
                      >
                        <TableIcon className="size-4 mr-2" />3 x 3
                      </MenubarItem>
                      <MenubarItem
                        className="!p-2.5 flex gap-2 justify-center items-center"
                        onClick={() => insertTable({ rows: 4, cols: 4 })}
                      >
                        <TableIcon className="size-4 mr-2" />4 x 4
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  {/* <MenubarItem className="!p-2.5">
                    <BookmarkIcon className="size-4 mr-2" />
                    Bookmark
                  </MenubarItem> */}
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger className="!p-2.5 flex gap-2 justify-start items-center">
                      <TextIcon className="size-4 mr-2" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        className="!p-2.5"
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                      >
                        <BoldIcon className="size-4 mr-2" />
                        Bold <MenubarShortcut>⌘B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        className="!p-2.5"
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                      >
                        <ItalicIcon className="size-4 mr-2" />
                        Italic <MenubarShortcut>⌘I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        className="!p-2.5"
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                      >
                        <UnderlineIcon className="size-4 mr-2" />
                        Underline <MenubarShortcut>⌘U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        className="!p-2.5"
                        onClick={() =>
                          editor?.chain().focus().toggleStrike().run()
                        }
                      >
                        <StrikethroughIcon className="size-4 mr-2" />
                        StrikeThrough <MenubarShortcut>⌘S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    className="p-2.5!"
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                  >
                    <RemoveFormattingIcon className="size-4 mr-2" />
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  );
};
