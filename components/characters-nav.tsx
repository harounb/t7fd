import { useState } from "react";
import ChevronUp from "./icons/chevron-up";
import ChevronDown from "./icons/chevron-down";
import NavLink from "./navlink";

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

export const isCharacter = (key: string): key is (typeof CHARACTERS[number]) => {
  return CHARACTERS.some(testKey => testKey === key);
}

export const CHARACTER_DISPLAY_NAME = {
  "generic": "Generic",
  "akuma": "Akuma",
  "alisa": "Alisa",
  "anna": "Anna",
  "armor_king": "Armor King",
  "asuka": "Asuka Kazama",
  "bob": "Bob",
  "bryan": "Bryan",
  "claudio": "Claudio",
  "devil_jin": "Devil Jin",
  "dragunov": "Dragunov",
  "eddy": "Eddy",
  "eliza": "Eliza",
  "fahkumram": "Fahkumram",
  "feng":"Feng",
  "ganryu": "Ganryu",
  "geese": "Geese",
  "gigas": "Gigas",
  "heihachi": "Heihachi",
  "hwoarang": "Hwoarang",
  "jack7": "Jack-7",
  "jin": "Jin",
  "josie": "Josie",
  "julia": "Julia",
  "katarina": "Katarina",
  "kazumi": "Kazumi",
  "kazuya": "Kazuya",
  "king": "King",
  "kuma": "Kuma / Panda",
  "kunimitsu": "Kunimitsu",
  "lars": "Lars",
  "law": "Law",
  "lee": "Lee",
  "lei": "Lei",
  "leo": "Leo",
  "leroy": "Leroy",
  "lidia": "Lidia",
  "lili": "Lili",
  "lucky_chloe": "Lucky Chloe",
  "marduk": "Marduk",
  "master_raven": "Master Raven",
  "miguel": "Miguel",
  "negan": "Negan",
  "nina": "Nina",
  "noctis": "Noctis",
  "paul": "Paul",
  "shaheen": "Shaheen",
  "steve": "Steve",
  "xiaoyu": "Xiaoyu",
  "yoshimitsu": "Yoshimitsu",
  "zafina":"Zafina",
}

export default function CharactersNav() {
    const [collapsed, setCollapsed] = useState(false);
    const Arrow = collapsed ? ChevronDown : ChevronUp;
    return (
        <section>
        <button className="w-full font-bold text-lg pb-1 flex items-center justify-between cursor-pointer" onClick={() => setCollapsed(!collapsed)}><span>Characters</span> <Arrow className="w-4 h-4" /></button>
        <ul className={collapsed ? 'hidden' : 'pl-4'}>
          {CHARACTERS.map((character) => (
            <li key={character}>
              <NavLink
                href={`/character/${character}`}
              >
                {CHARACTER_DISPLAY_NAME[character]}
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    )
}