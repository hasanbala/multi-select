import { ICharacters } from "./models/characters";

export const getCharacters = async (term: string) => {
  if (!term || !term.trim()) {
    return null;
  }

  const response = await fetch(
    `${import.meta.env.VITE_APP_API_URL}character?name=${term}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json",
      } as any,
    }
  );

  const { results } = await response.json();

  const newResults = results.map((data: ICharacters) => ({
    name: data.name,
    id: data.id,
    episodeLength: data.episode?.length,
    image: data.image,
  }));

  return newResults;
};
