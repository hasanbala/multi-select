import { useEffect, useState } from "react";

export const useDebounce = (inputValue: string, delay: number) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleDebounce = setTimeout(() => {
      setSearchTerm(inputValue);
    }, delay);

    return () => {
      clearTimeout(handleDebounce);
    };
  }, [inputValue, delay]);

  return { searchTerm };
};
