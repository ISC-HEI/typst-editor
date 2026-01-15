/*
  Warnings:

  - Added the required column `shareCode` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "shareCode" VARCHAR(15) NOT NULL;
