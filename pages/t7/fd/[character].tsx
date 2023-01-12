import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { GetStaticProps } from 'next';
import Head from "next/head";
import { useRouter } from "next/router";
import Link from 'next/link'
import { Source_Code_Pro } from "@next/font/google";
import SearchIcon from "../../../component/icons/search";
import useDebounce from "../../../hook/useDebounce";

type RawGithubMove = {
  Alias?: string[];
  "Block frame": string;
  Command: string;
  "Counter hit frame": string;
  Damage: string;
  Gif: string;
  "Hit frame": string;
  "Hit level": string;
  Notes: string;
  "Start up frame": string;
  Tags: string[];
};

type Move = {
  alias?: string[];
  blockFrame: string;
  command: string;
  damage: string;
  gif: string;
  hitFrame: string;
  hitLevel: string;
  notes: string;
  startUpFrame: string;
  tags: string[];
};

const rawGithubMoveToMove = (rawGithubMove: RawGithubMove): Move => ({
  alias: rawGithubMove.Alias,
  blockFrame: rawGithubMove["Block frame"],
  command: rawGithubMove.Command,
  damage: rawGithubMove.Damage,
  gif: rawGithubMove.Gif,
  hitFrame: rawGithubMove["Hit frame"],
  hitLevel: rawGithubMove["Hit level"],
  notes: rawGithubMove.Notes,
  startUpFrame: rawGithubMove["Start up frame"],
  tags: rawGithubMove.Tags,
});

const jsonBaseUrl = "https://raw.githubusercontent.com/harounb/mokujin/master/json/";

export const getStaticProps: GetStaticProps<{[key: string]: any}, {[key: string]: any}> = async (context) => {
  const { params } = context;

  if(params === undefined) {
    return {props: {}};
  }

  
  const { character } = params;
  const jsonRes =  await (fetch(`${jsonBaseUrl}/${character !== 'generic' ? character : '!generic'}.json`));
  const data: RawGithubMove[] = await jsonRes.json();

  // Pass data to the page via props
  return {
    props: { data: JSON.parse(JSON.stringify(data.map(rawGithubMoveToMove))) },
  };
}

export const getStaticPaths = () => ({fallback: false, paths: characters.map((character) => ({params: {character}}))})

const orderedColumns = [
  "command",
  "hitLevel",
  "damage",
  "startUpFrame",
  "blockFrame",
  "hitFrame",
  "notes"
];

const characters = [
"generic",
"akuma",
"alisa",
"anna",
"armor_king",
"asuka",
"bob",
"bryan",
"claudio",
"devil_jin",
"dragunov",
"eddy",
"eliza",
"fahkumram",
"feng",
"ganryu",
"geese",
"gigas",
"heihachi",
"hwoarang",
"jack7",
"jin",
"josie",
"julia",
"katarina",
"kazumi",
"kazuya",
"king",
"kuma",
"kunimitsu",
"lars",
"law",
"lee",
"lei",
"leo",
"leroy",
"lidia",
"lili",
"lucky_chloe",
"marduk",
"master_raven",
"miguel",
"negan",
"nina",
"noctis",
"paul",
"shaheen",
"steve",
"xiaoyu",
"yoshimitsu",
"zafina"
];

const columnDisplayNamesById = {
  alias: "Alias",
  blockFrame: "Block frame",
  command: "Command",
  damage: "Damage",
  gif: "Gif",
  hitFrame: "Hit frame",
  hitLevel: "Hit level",
  notes: "Notes",
  startUpFrame: "Start up",
  tags: "Tags",
};

const initialDisplayedColumns = [
  "command",
  "startUpFrame",
  "blockFrame",
  "hitFrame"
];

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

export default function Home({ data }: { data: Move[] }) {
  const [displayedColumns, setDisplayedColumns] = useState(
    initialDisplayedColumns
  );
  const { query, push } = useRouter();
  const [searchQuery, setSearchQuery] = useState(query.search);
  const debouncedSearchQuery = useDebounce(searchQuery);
  const searchFilteredMoves =
    typeof debouncedSearchQuery === "string"
      ? data.filter((move) => move.command.startsWith(debouncedSearchQuery))
      : data;

  const createHandleChange = (columnKey: keyof Move) => () => {
    if (
      displayedColumns.find(
        (displayedColumnKey) => displayedColumnKey === columnKey
      )
    ) {
      setDisplayedColumns(
        displayedColumns.filter(
          (displayedColumns) => displayedColumns !== columnKey
        )
      );
    } else {
      setDisplayedColumns([...displayedColumns, columnKey]);
    }
  };

  const isColumnKey = (key: string): key is keyof Move => {
    return orderedColumns.some((columnKey) => columnKey === key);
  };
  const columnIsDisplayed = (column: string): column is keyof Move & boolean => {
    if (!isColumnKey(column)) {
      return false;
    }
    return displayedColumns.some(
      (displayedColumns) => displayedColumns === column
    );
  };

  useEffect(() => {
    push({query: {search: debouncedSearchQuery, ...query}});
  }, [debouncedSearchQuery])

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {search} = Object.fromEntries(formDataToURLSearchParams(
      new FormData(event.currentTarget)
    ));
    
    setSearchQuery(search)
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <>
      <Head>
        <title>Tekken 7 Frame Data</title>
        <meta name="description" content="Tekken 7 Frame Data" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className="font-mono min-h-screen flex text-stone-50 bg-gray-800"
      >
        <aside className="max-h-screen overflow-scroll w-80 p-4 shrink-0">
          <h1 className="text-3xl pb-2 font-bold">
            Tekken 7 <br /> Frame Data
          </h1>
          <h2 className="text-2xl pb-8">{query.selectedCharacter}</h2>
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
              value={searchQuery}
              onChange={handleSearchChange}
            />

            <button className="pl-2 pointer" type="submit">
              <span className="sr-only">Submit Search</span>
              <SearchIcon />
            </button>
          </form>
          <fieldset className="pb-4">
            <legend className="font-bold text-lg pb-1">Columns</legend>
            {orderedColumns.filter(isColumnKey).map((column) => (
              <div key={column}>
                <input
                  type="checkbox"
                  id={`column-${column}`}
                  name={`column-${column}`}
                  checked={columnIsDisplayed(column)}
                  onChange={createHandleChange(column)}
                />
                <label htmlFor={`column-${column}`}>
                  {columnDisplayNamesById[column]}
                </label>
              </div>
            ))}
          </fieldset>
          <section>
            <span className="font-bold text-lg pb-1">Characters</span>
            <ul>
              {characters.map((character) => 
                <li key={character}>
                  <Link  className="underline hover:text-gray-300" href={`/t7/fd/${character}`}>{character}</Link>
                </li>
              )}
            </ul>
          </section>
        </aside>
        <main className="max-h-screen overflow-scroll">
          <table>
            <thead>
              <tr className="sticky top-0 bg-gray-800 pt-4">
                {orderedColumns.filter(columnIsDisplayed).map((column) => (
                  <th className="text-left p-2" key={column}>
                    {columnDisplayNamesById[column]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {searchFilteredMoves.map((move, index) => {
                return (
                  <tr
                    className={`${
                      index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
                    } hover:bg-gray-400`}
                    key={JSON.stringify(move)}
                  >
                    {orderedColumns.filter(columnIsDisplayed).map((displayedColumn) => (
                      <td
                        className="text-left p-2"
                        key={`move-${move.command}-key-${displayedColumn}`}
                      >
                        {move[displayedColumn]}
                      </td>
                    ))}
                    {/* I think I got blocked from gfycat cos of this line <td>{move.gif && <img src={move.gif} /> }</td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
}
