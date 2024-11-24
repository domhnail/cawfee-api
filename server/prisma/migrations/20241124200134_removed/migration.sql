/*
  Warnings:

  - You are about to drop the column `order_date` on the `Purchase` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Purchase" (
    "purchase_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customer_id" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "credit_card" INTEGER NOT NULL,
    "credit_expire" INTEGER NOT NULL,
    "credit_cvv" INTEGER NOT NULL,
    "invoice_amt" REAL NOT NULL,
    "invoice_tax" REAL NOT NULL,
    "invoice_total" REAL NOT NULL
);
INSERT INTO "new_Purchase" ("city", "country", "credit_card", "credit_cvv", "credit_expire", "customer_id", "invoice_amt", "invoice_tax", "invoice_total", "postal_code", "province", "purchase_id", "street") SELECT "city", "country", "credit_card", "credit_cvv", "credit_expire", "customer_id", "invoice_amt", "invoice_tax", "invoice_total", "postal_code", "province", "purchase_id", "street" FROM "Purchase";
DROP TABLE "Purchase";
ALTER TABLE "new_Purchase" RENAME TO "Purchase";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
