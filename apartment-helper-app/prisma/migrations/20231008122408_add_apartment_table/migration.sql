-- CreateTable
CREATE TABLE "Apartment" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Apartment_pkey" PRIMARY KEY ("id")
);
