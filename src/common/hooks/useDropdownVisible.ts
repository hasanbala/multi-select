import { useEffect, useRef } from "react";

export const useDropdownOptionsVisible = (
  setIsDropdownOptionsVisible: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const ref: any = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsDropdownOptionsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [ref]);

  return { ref };
};
