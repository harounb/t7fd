import Link from "next/link";
export const CHARACTERS = [
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
  "zafina",
] as const;

export default function CharactersNav() {
    return (
        <section>
        <span className="font-bold text-lg pb-1">Characters</span>
        <ul>
          {CHARACTERS.map((character) => (
            <li key={character}>
              <Link
                className="underline hover:text-gray-300"
                href={`/t7/fd/${character}`}
              >
                {character}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    )
}