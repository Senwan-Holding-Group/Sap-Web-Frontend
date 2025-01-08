/* eslint-disable @typescript-eslint/no-explicit-any */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const capitalize = (str: string) =>
  str?.replace(/\b\w/g, (substr) => substr.toUpperCase());

export const processImport = (data:string) => {
  const rows = data.split("\n");
  const headers = rows[0].split("\t");

  const result = rows
    .slice(1)
    .map((row, index) => {
      try {
        const cells = row.split("\t");
        if (cells.length !== headers.length) {
          return {
            isValid: false,
            rowNumber: index + 2,
            error: `Invalid number of columns. Expected ${headers.length}, got ${cells.length}`,
            data: null,
          };
        }
        if (!cells[0]?.trim()) {
          return {
            isValid: false,
            rowNumber: index + 2,
            error: "Item code cannot be empty",
            data: null,
          };
        }

        const qty = parseInt(cells[1]);
        if (isNaN(qty) || qty <= 0) {
          return {
            isValid: false,
            rowNumber: index + 2,
            error: "Quantity must be a positive number",
            data: null,
          };
        }
        return {
          isValid: true,
          rowNumber: index + 2,
          error: null,
          data: {
            [headers[0].toLowerCase()]: cells[0].trim(),
            [headers[1].toLowerCase()]: qty,
          },
        };
      } catch (error:any) {
        return {
          isValid: false,
          rowNumber: index + 2,
          error: `Failed to process row: ${error.message}`,
          data: null,
        };
      }
    })
    .filter((row) => row.rowNumber && row.rowNumber > 0);

  const validRows = result.filter((row) => row.isValid).map((row) => row.data);
  const invalidRows = result.filter((row) => !row.isValid);

  console.log("Valid Rows:", validRows);
  if (invalidRows.length > 0) {
    console.log("Invalid Rows:", invalidRows);
    const errorMessage = invalidRows
      .map((row) => `Row ${row.rowNumber}: ${row.error}`)
      .join("\n");

    console.error("Import Errors:\n", errorMessage);
  }
  return {
    validRows,
    invalidRows,
    totalRows: result.length,
    successCount: validRows.length,
    errorCount: invalidRows.length,
  };
};
