import React, { useState } from "react";
import ChevronUp from "./icons/chevron-up";
import ChevronDown from "./icons/chevron-down";

const INITIAL_DISPLAYED_COLUMNS = [
  "command",
  "startUpFrame",
  "blockFrame",
  "hitFrame",
  "counterHitFrame"
] satisfies (keyof Move)[];

export type Move = {
  alias?: string[];
  blockFrame: string;
  command: string;
  damage: string;
  gif: string;
  hitFrame: string;
  counterHitFrame: string;
  hitLevel: string;
  notes: string;
  startUpFrame: string;
  tags: string[];
};

export const ORDERED_COLUMNS = [
  "command",
  "hitLevel",
  "damage",
  "startUpFrame",
  "blockFrame",
  "hitFrame",
  "counterHitFrame",
  "notes",
] as const;

export const useColumns = () => {
  const [displayedColumns, setDisplayedColumns] = useState<(keyof Move)[]>(
    INITIAL_DISPLAYED_COLUMNS
  );

  return { displayedColumns, setDisplayedColumns };
};

export const isColumnKey = (key: string): key is keyof Move => {
  return ORDERED_COLUMNS.some((columnKey) => columnKey === key);
};

export const columnIsDisplayed =
  (displayedColumns: (keyof Move)[]) =>
  (column: string): column is keyof Move & boolean => {
    if (!isColumnKey(column)) {
      return false;
    }
    return displayedColumns.some(
      (displayedColumns) => displayedColumns === column
    );
  };

export const COLUMN_DISPLAY_NAMES = {
  alias: "Alias",
  blockFrame: "Block frame",
  command: "Command",
  damage: "Damage",
  gif: "Gif",
  hitFrame: "Hit frame",
  counterHitFrame: "Counter hit frame",
  hitLevel: "Hit level",
  notes: "Notes",
  startUpFrame: "Start up",
  tags: "Tags",
};

export default function ColumnSelect({
  displayedColumns,
  onDisplayedColumnsChange,
}: {
  displayedColumns: (keyof Move)[];
  onDisplayedColumnsChange: (newDisplayedColumns: (keyof Move)[]) => void;
}): JSX.Element {
  const createHandleChange = (columnKey: keyof Move) => () => {
    if (
      displayedColumns.find(
        (displayedColumnKey) => displayedColumnKey === columnKey
      )
    ) {
      onDisplayedColumnsChange(
        displayedColumns.filter(
          (displayedColumns) => displayedColumns !== columnKey
        )
      );
    } else {
      onDisplayedColumnsChange([...displayedColumns, columnKey]);
    }
  };

  const [collapsed, setCollapsed] = useState(false);
  const Arrow = collapsed ? ChevronDown : ChevronUp;
  return (
    <fieldset className="pb-4">
      <legend className="font-bold text-lg pb-1 w-full"><button className="w-full flex items-center justify-between" onClick={() => setCollapsed(!collapsed)}>Columns <Arrow className="w-4 h-4" /></button></legend>
      <div className={collapsed ? 'hidden' : 'pl-4'}>
      {ORDERED_COLUMNS.filter(isColumnKey).map((column) => (
        <div key={column}>
          <input
            type="checkbox"
            id={`column-${column}`}
            name={`columns`}
            checked={columnIsDisplayed(displayedColumns)(column)}
            onChange={createHandleChange(column)}
          />
          <label htmlFor={`column-${column}`}>
            {COLUMN_DISPLAY_NAMES[column]}
          </label>
        </div>
      ))}
      </div>
    </fieldset>
  );
}
