"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/editor-store";
import { type ColorResult, SketchPicker } from "react-color";
import {
  BoldIcon,
  ItalicIcon,
  LucideIcon,
  PrinterIcon,
  Redo2Icon,
  SpellCheck,
  UnderlineIcon,
  Undo2Icon,
  MessageSquarePlusIcon,
  ListTodoIcon,
  RemoveFormattingIcon,
  ChevronDown,
  HighlighterIcon,
  Link2Icon,
  ImageIcon,
  UploadIcon,
  SearchIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignCenterIcon,
  AlignJustifyIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PlusIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Separator } from "@/components/ui/separator";
import { type Level } from "@tiptap/extension-heading";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

const FontSizeButton = () => {
  const { editor } = useEditorStore();

  const currentFontSize = editor?.getAttributes("textStyle").fontSize ? editor.getAttributes("textStyle").fontSize.replace("px", ""): "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    } 
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };
  return (
    <div className="flex items-center gap-x-0.5">
      <button
      onClick={decrement} 
      className="h-7 w-7 gap-x-2 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
        <MinusIcon className="size-4" />
      </button>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          className="h-7 w-10 gap-x-2 text-center text-sm border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className="h-7 w-10 gap-x-2 text-center text-sm border border-neutral-400 rounded-sm bg-transparent cursor-text"
        >
          {currentFontSize}
        </button>
      )}

      <button
      onClick={increment} 
      className="h-7 w-7 gap-x-2 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80">
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};

const ListButton = () => {
  const { editor } = useEditorStore();

  const Lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      label: "Ordered List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];

  // const getCurrentListStyle = () =>{
  //   for(const list of Lists){
  //     if(list.isActive()){
  //       return list.label;
  //     }
  //   }
  //   return "Bullet List";

  // }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 gap-x-2 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          {/* <span>{getCurrentListStyle()}</span> */}
          <ListIcon className="size-4" />
          <ChevronDown className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Lists.map(({ label, isActive, icon: Icon, onClick }) => (
          <button
            className={cn(
              "flex items-center justify-center gap-x-2 !px-3 !py-1 rounded-sm hover:bg-neutral-200/80",
              isActive() && "bg-neutral-200/80" //this is react shorthand property of ternary operator which executes only if part and not the else part
            )}
            key={label}
            onClick={onClick}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  const getCurrentAlignment = () => {
    for (const alignment of alignments) {
      if (editor?.isActive({ textAlign: alignment.value })) {
        return alignment.label;
      }
    }
    return alignments[0].label;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 gap-x-2 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span>{getCurrentAlignment()}</span>
          <AlignLeftIcon className="size-4" />
          <ChevronDown className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {alignments.map(({ label, value, icon: Icon }) => (
          <button
            className={cn(
              "flex items-center justify-center gap-x-2 !px-3 !py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.isActive("textAlign", { textAlign: value }) &&
                "bg-neutral-200/80"
            )}
            key={value}
            onClick={() => {
              editor?.chain().focus().setTextAlign(value).run();
            }}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [imageUrl, setImageUrl] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  // creating a custom image upload button from local file system
  const onUpload = () => {
    const input = document.createElement("input"); //creating a file input element
    input.type = "file"; //explicitly setting the type to file i.e input type -> file
    input.accept = "image/*"; //accepting only image files
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };
    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="!p-3 flex flex-col items-center gap-x-2 gap-y-2">
          <DropdownMenuItem
            className="flex shrink-0  justify-center px-1.5 overflow-hidden rounded-sm text-sm items-center  hover:border-none hover:outline-none cursor-pointer hover:bg-neutral-200/80"
            onClick={onUpload}
          >
            <UploadIcon className="size-4 mr-2" />
            <span className="p-2">Upload</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="flex shrink-0  justify-center px-1.5 overflow-hidden rounded-sm text-sm items-center hover:border-none hover:outline-none cursor-pointer hover:bg-neutral-200/80"
            onClick={() => setIsDialogOpen(true)}
          >
            <SearchIcon className="size-4 mr-2" />
            <span className="p-2">Paste image url</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] h-1/3 !p-10">
          <DialogHeader>
            <DialogTitle>Insert Image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button size="sm" className="!px-3" onClick={handleImageUrlSubmit}>
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState("");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };
  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <Link2Icon className="size-5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="!p-5 flex items-center gap-x-2">
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button className="!px-6" onClick={() => onChange(value)}>
          Apply
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("highlight").color || "#FFFFFF";
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().toggleHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm",
            editor?.isActive("highlight") && "bg-neutral-200/80"
          )}
        >
          <HighlighterIcon className="size-4" />
          {/* <div className="h-0.5 w-full" style={{backgroundColor : value}}/> */}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SketchPicker className="!p-5" color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();

  const value = editor?.getAttributes("textStyle").color || "#000000";
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="text-sm !px-2.5">A</span>
          <div className="h-0.5 w-[70%]" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <SketchPicker className="!p-5" color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();

  const headings = [
    { label: "Normal Text", value: 0, fontSize: "16px" },
    { label: "Heading 1", value: 1, fontSize: "32px" },
    { label: "Heading 2", value: 2, fontSize: "24px" },
    { label: "Heading 3", value: 3, fontSize: "20px" },
    { label: "Heading 4", value: 4, fontSize: "18px" },
    { label: "Heading 5", value: 5, fontSize: "16px" },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 5; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal Text";
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 w-[120px] shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDown className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-2 !px-4 !pt-2">
        {headings.map((item) => (
          <button
            key={item.value}
            style={{ fontSize: item.fontSize }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              ((item.value === 0 && !editor?.isActive("heading")) ||
                editor?.isActive("heading", { level: item.value })) &&
                "bg-neutral-200/80"
            )}
            onClick={() => {
              if (item.value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: item.value as Level })
                  .run();
              }
            }}
          >
            {item.label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();

  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Georgia", value: "Georgia" },
    { label: "Verdana", value: "Verdana" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[100px] shrink-0 flex items-center justify-around rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">
            {editor?.getAttributes("textstyle").FontFamily || "Arial"}
          </span>
          <ChevronDown className="ml-2 size-4 shrink-0" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-2 !px-4 !pt-2">
        {fonts.map((item) => (
          <button
            key={item.value}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
              editor?.getAttributes("textStyle").FontFamily === item.value &&
                "bg-neutral-200/80"
            )}
            style={{ fontFamily: item.value }}
            onClick={() =>
              editor?.chain().focus().setFontFamily(item.value).run()
            }
          >
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80", //toolbar buttons styling
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

export const Toolbar = () => {
  const { editor } = useEditorStore();
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "Spell Check",
        icon: SpellCheck,
        onClick: () => {
          const currentSpellCheck =
            editor?.view.dom.getAttribute("spellcheck") === "true";
          editor?.view.dom.setAttribute(
            "spellcheck",
            currentSpellCheck ? "false" : "true"
          );
        },
      },
    ],
    [
      {
        label: "Bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "Italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "Underline",
        icon: UnderlineIcon,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],
    [
      {
        label: "Comment",
        icon: MessageSquarePlusIcon,
        isActive: false,
        onClick: () => console.log("todo"),
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        isActive: editor?.isActive("tasklist"),
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];
  return (
    //toolbar styling goes from here
    <div className="bg-[#F1F4F9] !px-2.5 !py-0.5 rounded-[14px] min-h-[40px] w-full flex items-center gap-x-2.5 !mx-2.5 !overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <Separator orientation="vertical" className="!h-6 bg-neutral-300" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="!h-6 bg-neutral-300" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="!h-6 bg-neutral-300" />
      <FontSizeButton />
      <Separator orientation="vertical" className="!h-6 bg-neutral-300" />

      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}

      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation="vertical" className="!h-6 bg-neutral-300" />
      {/* link tool */}
      <LinkButton />
      {/* image tool */}
      <ImageButton />

      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="!h-6 bg-neutral-300" />
      <AlignButton />
      <ListButton />
    </div>
  );
};
