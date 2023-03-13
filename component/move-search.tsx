import { FormEvent, ChangeEvent, useRef } from "react";
import debounce from "lodash.debounce";
import { useRouter } from "next/router";
import SearchIcon from "./icons/search";


const formDataToURLSearchParams = (formData: FormData): URLSearchParams =>
  new URLSearchParams(
    Array.from(
      formData.entries(),
      ([key, formDataEntryValue]: [string, FormDataEntryValue]): string[] => [
        key,
        formDataEntryValue.toString(),
      ]
    )
  );

export default function MoveSearch() {
    const { query, push } = useRouter();
  
    const debouncedPush = debounce(
      (search) => push({ query: { ...query, search } }),
      500
    );
  
    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
  
      const { search } = Object.fromEntries(
        formDataToURLSearchParams(new FormData(event.currentTarget))
      );
  
      debouncedPush(search);
    };
  
    const searchInputRef = useRef(null);
  
    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
      debouncedPush(event.target.value);
    };
  
    return (
      <form
        className="pb-4 flex"
        role="search"
        method="get"
        onSubmit={handleSearchSubmit}
      >
        <label htmlFor="header-search">
          <span className="sr-only">Search</span>
        </label>
  
        <input
          className="bg-gray-800 border border-gray-600"
          type="text"
          id="header-search"
          name="search"
          defaultValue={query.search}
          onChange={handleSearchChange}
          ref={searchInputRef}
        />
  
        <button className="pl-2 pointer" type="submit">
          <span className="sr-only">Submit Search</span>
          <SearchIcon />
        </button>
      </form>
    );
  }