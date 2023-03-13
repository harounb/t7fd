import React, { useState } from "react";

const INITIAL_DISPLAYED_COLUMNS = [
  "command",
  "startUpFrame",
  "blockFrame",
  "hitFrame",
] satisfies (keyof Move)[];

export type Move = {
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

export const ORDERED_COLUMNS = [
  "command",
  "hitLevel",
  "damage",
  "startUpFrame",
  "blockFrame",
  "hitFrame",
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
  return (
    <fieldset className="pb-4">
      <legend className="font-bold text-lg pb-1">Columns</legend>
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
    </fieldset>
  );
}
