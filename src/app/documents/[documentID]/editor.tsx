"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Gapcursor from "@tiptap/extension-gapcursor";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Text from "@tiptap/extension-text";
import TextAlign from "@tiptap/extension-text-align";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";

import { useEditorStore } from "@/store/editor-store";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";

import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link, { LinkProtocolOptions } from "@tiptap/extension-link";

//custom extension import
import { FontSizeExtension } from "@/extensions/font-size";

interface uriValidationContext {
  defaultValidate: (url: string) => boolean;
  protocols: Array<LinkProtocolOptions | string>;
  defaultProtocol: string;
}
const isAllowedUrifunc = (url: string, ctx: uriValidationContext) => {
  try {
    // construct URL
    const parsedUrl = url.includes(":")
      ? new URL(url)
      : new URL(`${ctx.defaultProtocol}://${url}`);

    // use default validation
    if (!ctx.defaultValidate(parsedUrl.href)) {
      return false;
    }

    // disallowed protocols
    const disallowedProtocols = ["ftp", "file", "mailto"];
    const protocol = parsedUrl.protocol.replace(":", ""); //parsedUrl.protocol returns https: , and to check with disallowedProtocols we need to remove the ':'

    if (disallowedProtocols.includes(protocol)) {
      return false;
    }

    // only allow protocols specified in ctx.protocols
    const allowedProtocols = ctx.protocols.map((p) =>
      typeof p === "string" ? p : p.scheme
    );

    if (!allowedProtocols.includes(protocol)) {
      return false;
    }

    // disallowed domains
    // This is a part which is to be removed later
    const disallowedDomains = [
      "scdgovtcollege.ac.in",
    ];
    const domain = parsedUrl.hostname; // extracts hostname fro url , e.g. https://example.com -> example.com

    if (disallowedDomains.includes(domain)) {
      console.log("Disallowed domain:", domain);
      return false;
    }

    // all checks have passed
    // console.log(domain);
    return true;
  } catch {
    return false;
  }
};
const shouldAutoLinkfunc = (url: string) => {
  try {
    // construct URL
    const parsedUrl = url.includes(":")
      ? new URL(url)
      : new URL(`https://${url}`);

    // only auto-link if the domain is not in the disallowed list
    const disallowedDomains = [
      "scdgovtcollege.ac.in",
    ];
    const domain = parsedUrl.hostname;

    return !disallowedDomains.includes(domain);
  } catch {
    return false;
  }
};

const Extensions = [
  StarterKit,
  FontSizeExtension,
  Color,
  Highlight.configure({ multicolor: true }),
  FontFamily,
  TextStyle,
  Heading.configure({
    levels: [1, 2, 3, 4, 5],
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
    alignments: ["left", "center", "right", "justify"],
    defaultAlignment: "left",
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],
    isAllowedUri: isAllowedUrifunc,
    shouldAutoLink: shouldAutoLinkfunc,
    validate: (url) => {
      return isAllowedUrifunc(url, {
        defaultValidate: Link.options.shouldAutoLink,
        protocols: Link.options.protocols,
        defaultProtocol: Link.options.defaultProtocol,
      });
    },
  }),
  Underline,
  Document,
  Paragraph,
  Text,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Gapcursor,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  TableCell,
  Image,
  ImageResize,
  Dropcursor,
];
export const Editor = () => {
  const { setEditor } = useEditorStore();
  const editor = useEditor({
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    extensions: Extensions,
    immediatelyRender:false,
    editorProps: {
      attributes: {
        style: "padding-left:56px; padding-right:56px;",
        class:
          "print:border-0 bg-white flex flex-col min-h-[1054px] w-[400px] sm:w-[540px] md:w-[816px] !pt-10 !pr-14 !pb-10 text-center focus:outline-none cursor-text",
      },
    },
  });

  return (
    <>
      <div className="size-full overflow-x-auto flex flex-col gap-3 justify-center items-center bg-[#FAFBFD] PX-4 print:p-0 print:bg-white print:overflow-visible">
        <div className="min-w-max flex justify-center border border-[#C7C7C7] w-[400px] sm:w-[540px] md:w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
          <EditorContent editor={editor} />
        </div>
      </div>
    </>
  );
};
