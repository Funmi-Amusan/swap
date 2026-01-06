import { prisma } from './prisma';

export async function getPhoneModels() {
  try {
    const models = await prisma.phoneModel.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return models.map(model => ({
      value: model.value,
      label: model.label,
      basePrice: model.basePrice,
    }));
  } catch (error) {
    console.error('Failed to fetch phone models:', error);
    return [];
  }
}

export async function getPhoneConditions() {
  try {
    const conditions = await prisma.phoneCondition.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
    });
    return conditions.map(condition => ({
      value: condition.value,
      label: condition.label,
      priceModifier: condition.priceModifier,
    }));
  } catch (error) {
    console.error('Failed to fetch phone conditions:', error);
    return [];
  }
}

export async function getPricingRules() {
  try {
    const rules = await prisma.pricingRule.findMany({
      where: { isActive: true },
    });
    return rules;
  } catch (error) {
    console.error('Failed to fetch pricing rules:', error);
    return [];
  }
}

export function calculatePrice(
  basePrice: number,
  conditionModifier: number,
  pricingRules: any[] = []
): number {
  let finalPrice = basePrice * conditionModifier;

  // Apply pricing rules
  for (const rule of pricingRules) {
    if (rule.isPercentage) {
      finalPrice += finalPrice * (rule.priceAdjustment / 100);
    } else {
      finalPrice += rule.priceAdjustment;
    }
  }

  return Math.round(finalPrice * 100) / 100; // Round to 2 decimal places
}

// New: Fetch multi-factor condition attribute groups with options
export async function getConditionAttributeGroups() {
  try {
    const groups = await prisma.conditionAttributeGroup.findMany({
      where: { isActive: true },
      orderBy: { order: 'asc' },
      include: {
        options: {
          where: { isActive: true },
          orderBy: { order: 'asc' },
        },
      },
    });

    return groups.map(g => ({
      key: g.key,
      label: g.label,
      description: g.description ?? undefined,
      options: g.options.map(o => ({
        value: o.value,
        label: o.label,
        priceModifier: o.priceModifier,
      })),
    }));
  } catch (error) {
    console.error('Failed to fetch condition attribute groups:', error);
    return [];
  }
}

// New: Calculate price using multiple attribute modifiers (multiplicative)
export function calculateMultiFactorPrice(
  basePrice: number,
  attributeModifiers: number[] = [],
  pricingRules: any[] = []
): number {
  const combinedModifier = attributeModifiers.reduce((acc, m) => acc * (m ?? 1), 1);
  let finalPrice = basePrice * combinedModifier;

  for (const rule of pricingRules) {
    if (rule.isPercentage) {
      finalPrice += finalPrice * (rule.priceAdjustment / 100);
    } else {
      finalPrice += rule.priceAdjustment;
    }
  }

  return Math.round(finalPrice * 100) / 100;
}
