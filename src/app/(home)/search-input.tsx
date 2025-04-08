"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon, XIcon } from "lucide-react";
import { useSearchParam } from "@/hooks/use-search-param";

export const SearchInput = () => {
  const [search , setSearch] = useSearchParam();
    const [value, setValue] = useState(search);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const handleClear = () =>{
        setValue("");
        setSearch("");
        inputRef.current?.blur();
    }

    //search function
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      setSearch(value);
      inputRef.current?.blur();
    }
  return (
    //flex-1 is just basically a shortcut for flex-grow , flex-shrink , flex-basis, //-> means our search input can grow and shrink if available space is more or less ,
    <div className="flex flex-1 items-center justify-center">
      <form onSubmit={handleSubmit} className="relative  max-w-[720px] w-full">
        <Input
          onChange={handleChange}
          ref={inputRef}
          value={value}
          placeholder="Search"
          className="md:text-base placeholder:text-neutral-800 !px-14 w-full border-none focus-visible:shadow[0_1px_1px_0_rgba(65,69,73,0.3),0_1px_3px_1px_rgba(65,69,73,0.15)] bg-[#F0F4F8] rounded-full h-[48px] focus-visible:ring-0 focus:bg-white"
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute top-1/2 left-3 -translate-y-1/2 [&_svg]:size-5 rounded-full"
        >
          <SearchIcon className="size-4 mr-2" />
        </Button>
        {value && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="absolute top-1/2 right-3 -translate-y-1/2 [&_svg]:size-5 rounded-full"
            onClick={handleClear}
          >
            <XIcon className="size-4 mr-2" />
          </Button>
        )}
      </form>
    </div>
  );
};
