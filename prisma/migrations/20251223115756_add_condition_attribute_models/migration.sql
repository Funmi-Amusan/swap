-- CreateTable
CREATE TABLE "public"."ConditionAttributeGroup" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConditionAttributeGroup_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ConditionAttributeOption" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "description" TEXT,
    "priceModifier" DOUBLE PRECISION NOT NULL DEFAULT 1.0,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConditionAttributeOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConditionAttributeGroup_key_key" ON "public"."ConditionAttributeGroup"("key");

-- CreateIndex
CREATE UNIQUE INDEX "ConditionAttributeOption_groupId_value_key" ON "public"."ConditionAttributeOption"("groupId", "value");

-- AddForeignKey
ALTER TABLE "public"."ConditionAttributeOption" ADD CONSTRAINT "ConditionAttributeOption_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."ConditionAttributeGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
