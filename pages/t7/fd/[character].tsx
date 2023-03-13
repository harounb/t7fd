import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import MenuIcon from "../../../component/icons/menu";
import MoveSearch from "../../../component/move-search";
import CharactersNav, { CHARACTERS } from "../../../component/characters-nav";
import ColumnSelect, {
  columnIsDisplayed,
  COLUMN_DISPLAY_NAMES,
  Move,
  ORDERED_COLUMNS,
  useColumns,
} from "../../../component/column-select";
import Sidebar, { useSidebar } from "../../../component/sidebar";

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

export const getStaticProps: GetStaticProps<
  { [key: string]: any },
  { [key: string]: any }
> = async (context) => {
  const jsonBaseUrl =
    "https://raw.githubusercontent.com/harounb/mokujin/master/json/";
  const { params } = context;

  if (params === undefined) {
    return { props: {} };
  }

  const { character } = params;
  const jsonRes = await fetch(
    `${jsonBaseUrl}/${character !== "generic" ? character : "!generic"}.json`
  );
  const data: RawGithubMove[] = await jsonRes.json();

  // Pass data to the page via props
  return {
    props: { data: JSON.parse(JSON.stringify(data.map(rawGithubMoveToMove))) },
  };
};

export const getStaticPaths = () => ({
  fallback: false,
  paths: CHARACTERS.map((character) => ({ params: { character } })),
});

export default function Home({ data }: { data: Move[] }) {
  const { displayedColumns, setDisplayedColumns } = useColumns();
  const sidebarState = useSidebar();
  const { query } = useRouter();
  const searchFilteredMoves =
    typeof query.search === "string"
      ? data.filter((move) => move.command.startsWith(query.search as string))
      : data;

  return (
    <>
      <Head>
        <title>Tekken 7 Frame Data - {query.character}</title>
        <meta name="description" content="Tekken 7 Frame Data" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div
        className={`font-mono min-h-screen max-h-screen flex ${
          sidebarState.sidebarIsVisible ? `flex-row` : `flex-col`
        } text-stone-50 bg-gray-800`}
      >
        <header
          className={`${
            sidebarState.sidebarIsVisible ? "hidden" : ""
          } m-2 sticky top-0`}
        >
          <span onClick={() => sidebarState.setSidebarIsVisible(true)}>
            <MenuIcon />
          </span>
        </header>
        <Sidebar state={sidebarState}>
          <h1 className="text-3xl pb-2 font-bold">
            Tekken 7 <br /> Frame Data
          </h1>
          <h2 className="text-2xl pb-8">{query.character}</h2>
          <MoveSearch />
          <ColumnSelect
            displayedColumns={displayedColumns}
            onDisplayedColumnsChange={setDisplayedColumns}
          />
          <CharactersNav />
        </Sidebar>
        <main className="max-h-screen overflow-scroll">
          <table>
            <thead>
              <tr className="sticky top-0 bg-gray-800 pt-4">
                {ORDERED_COLUMNS.filter(
                  columnIsDisplayed(displayedColumns)
                ).map((column) => (
                  <th className="text-left p-2" key={column}>
                    {COLUMN_DISPLAY_NAMES[column]}
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
                    {ORDERED_COLUMNS.filter(
                      columnIsDisplayed(displayedColumns)
                    ).map((displayedColumn) => (
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
