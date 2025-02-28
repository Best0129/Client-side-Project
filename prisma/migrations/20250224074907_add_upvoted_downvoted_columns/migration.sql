/*
  Warnings:

  - You are about to drop the column `downvoted` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `upvoted` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "downvoted",
DROP COLUMN "upvoted",
ADD COLUMN     "downVoted" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "upVoted" INTEGER NOT NULL DEFAULT 0;
