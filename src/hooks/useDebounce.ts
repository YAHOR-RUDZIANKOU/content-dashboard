import { useEffect, useState } from "react";

const useDebounce = (search: string, ms: number) => {
  const [debounceSearch, setDebounceSearch] = useState("");
  useEffect(() => {
    const delay = search === "" ? 0 : ms;
    const setId = setTimeout(() => {
      setDebounceSearch(search);
    }, delay);
    return () => {
      clearTimeout(setId);
    };
  }, [search, ms]);

  return debounceSearch;
};

export default useDebounce;
