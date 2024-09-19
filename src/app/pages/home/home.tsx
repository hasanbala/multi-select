import { useEffect, useState } from "react";
import { getCharacters } from "@common/services/chractersService";
import { IRestateCharacters } from "@common/services/models/characters";
import { MultiSelect } from "@common/components/multiSelect/multiSelect";
// import styles from "./home.module.scss";
import { useDebounce } from "@common/hooks/useDebounce";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [characters, setCharacters] = useState<IRestateCharacters[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { searchTerm } = useDebounce(inputValue, 500);

  useEffect(() => {
    setLoading(false);
    if (inputValue.trim() !== "" && searchTerm === inputValue) {
      getCharacters(searchTerm)
        .then((res: IRestateCharacters[]) => {
          setCharacters(res);

          console.log(res);
        })
        .catch(() => {
          setCharacters([]);
        })
        .finally(() => {
          setLoading(true);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <div className="p-24">
      <MultiSelect
        options={characters}
        setOptions={setCharacters}
        inputValue={inputValue}
        setInputValue={setInputValue}
        loading={loading}
        searchTerm={searchTerm}
      />
    </div>
  );
};
