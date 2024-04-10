import { useEffect, useState } from "react";

export const useDebounce = (searchTerm: string, delay: number) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setValue(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handleDebounce);
    };
  }, [searchTerm, delay]);

  return { value };
};
