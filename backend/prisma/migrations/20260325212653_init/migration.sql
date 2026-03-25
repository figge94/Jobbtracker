-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "employmentType" TEXT NOT NULL,
    "occupation" TEXT,
    "status" TEXT NOT NULL,
    "deadline" TEXT,
    "createdAt" TEXT NOT NULL,
    "adId" TEXT,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);
