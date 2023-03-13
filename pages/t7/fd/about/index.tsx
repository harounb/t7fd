import Head from "next/head";
import MenuIcon from "../../../../components/icons/menu";
import MoveSearch from "../../../../components/move-search";
import CharactersNav, {
  CHARACTERS,
} from "../../../../components/characters-nav";
import ColumnSelect, { useColumns } from "../../../../components/column-select";
import Sidebar, { useSidebar } from "../../../../components/sidebar";

export default function About() {
  const { displayedColumns, setDisplayedColumns } = useColumns();
  const sidebarState = useSidebar();

  return (
    <>
      <Head>
        <title>Tekken 7 Frame Data - About</title>
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
          <h2 className="text-2xl pb-8">About</h2>
          <MoveSearch />
          <ColumnSelect
            displayedColumns={displayedColumns}
            onDisplayedColumnsChange={setDisplayedColumns}
          />
          <CharactersNav />
        </Sidebar>
        <main className="max-h-screen overflow-scroll">
            <div className="mt-8 ml-8 text-lg">
            <p>A Tekken frame data app that works reasonably well on mobile.</p>
            <p>Made with ❤️ by <a className="underline hover:text-gray-300" href="https://harounb.com/">Haroun</a></p>
            <p>Frame data was sourced from the Discord Bot <a className="underline hover:text-gray-300" href="https://github.com/TLNBS2405/mokujin">Mokujin</a></p>
            <p><a className="underline hover:text-gray-300" href="https://streamelements.com/harounb/tip">Donations never mandatory but appreciated</a></p>
            </div>
        </main>
      </div>
    </>
  );
}
