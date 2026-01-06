const { PrismaClient } = require('../app/generated/prisma');

const prisma = new PrismaClient();

async function seed() {
  try {
    console.log('Seeding database...');

    // Clear existing data
    await prisma.phoneModel.deleteMany({});
    await prisma.phoneCondition.deleteMany({});
    await prisma.pricingRule.deleteMany({});

    // Seed phone models
    const phoneModels = [
      { label: 'iPhone X 64GB', value: 'x-64', model: 'iPhone X', storage: '64GB', basePrice: 150 },
      { label: 'iPhone X 256GB', value: 'x-256', model: 'iPhone X', storage: '256GB', basePrice: 200 },
      { label: 'iPhone XS 64GB', value: 'xs-64', model: 'iPhone XS', storage: '64GB', basePrice: 200 },
      { label: 'iPhone XS 256GB', value: 'xs-256', model: 'iPhone XS', storage: '256GB', basePrice: 250 },
      { label: 'iPhone 11 64GB', value: '11-64', model: 'iPhone 11', storage: '64GB', basePrice: 250 },
      { label: 'iPhone 11 128GB', value: '11-128', model: 'iPhone 11', storage: '128GB', basePrice: 300 },
      { label: 'iPhone 11 Pro 64GB', value: '11pro-64', model: 'iPhone 11 Pro', storage: '64GB', basePrice: 350 },
      { label: 'iPhone 11 Pro 256GB', value: '11pro-256', model: 'iPhone 11 Pro', storage: '256GB', basePrice: 400 },
      { label: 'iPhone 12 64GB', value: '12-64', model: 'iPhone 12', storage: '64GB', basePrice: 350 },
      { label: 'iPhone 12 128GB', value: '12-128', model: 'iPhone 12', storage: '128GB', basePrice: 400 },
      { label: 'iPhone 12 Pro 128GB', value: '12pro-128', model: 'iPhone 12 Pro', storage: '128GB', basePrice: 500 },
      { label: 'iPhone 12 Pro 256GB', value: '12pro-256', model: 'iPhone 12 Pro', storage: '256GB', basePrice: 550 },
      { label: 'iPhone 13 128GB', value: '13-128', model: 'iPhone 13', storage: '128GB', basePrice: 450 },
      { label: 'iPhone 13 256GB', value: '13-256', model: 'iPhone 13', storage: '256GB', basePrice: 500 },
      { label: 'iPhone 13 Pro 128GB', value: '13pro-128', model: 'iPhone 13 Pro', storage: '128GB', basePrice: 600 },
      { label: 'iPhone 13 Pro 256GB', value: '13pro-256', model: 'iPhone 13 Pro', storage: '256GB', basePrice: 650 },
      { label: 'iPhone 14 128GB', value: '14-128', model: 'iPhone 14', storage: '128GB', basePrice: 500 },
      { label: 'iPhone 14 256GB', value: '14-256', model: 'iPhone 14', storage: '256GB', basePrice: 550 },
      { label: 'iPhone 14 Pro 128GB', value: '14pro-128', model: 'iPhone 14 Pro', storage: '128GB', basePrice: 700 },
      { label: 'iPhone 14 Pro 256GB', value: '14pro-256', model: 'iPhone 14 Pro', storage: '256GB', basePrice: 750 },
      { label: 'iPhone 15 128GB', value: '15-128', model: 'iPhone 15', storage: '128GB', basePrice: 600 },
      { label: 'iPhone 15 256GB', value: '15-256', model: 'iPhone 15', storage: '256GB', basePrice: 650 },
      { label: 'iPhone 15 Pro 128GB', value: '15pro-128', model: 'iPhone 15 Pro', storage: '128GB', basePrice: 800 },
      { label: 'iPhone 15 Pro 256GB', value: '15pro-256', model: 'iPhone 15 Pro', storage: '256GB', basePrice: 850 },
      { label: 'iPhone 16 128GB', value: '16-128', model: 'iPhone 16', storage: '128GB', basePrice: 650 },
      { label: 'iPhone 16 256GB', value: '16-256', model: 'iPhone 16', storage: '256GB', basePrice: 700 },
      { label: 'iPhone 16 Pro 128GB', value: '16pro-128', model: 'iPhone 16 Pro', storage: '128GB', basePrice: 850 },
      { label: 'iPhone 16 Pro 256GB', value: '16pro-256', model: 'iPhone 16 Pro', storage: '256GB', basePrice: 900 },
    ];

    for (const model of phoneModels) {
      await prisma.phoneModel.create({
        data: {
          ...model,
          isActive: true,
          order: 0,
        },
      });
    }
    console.log(`✓ Created ${phoneModels.length} phone models`);

    // Seed phone conditions
    const conditions = [
      { label: 'Like New', value: 'like-new', description: 'No visible damage', priceModifier: 1.0 },
      { label: 'Good', value: 'good', description: 'Minor cosmetic damage', priceModifier: 0.85 },
      { label: 'Fair', value: 'fair', description: 'Visible damage but functional', priceModifier: 0.7 },
      { label: 'Poor', value: 'poor', description: 'Significant damage', priceModifier: 0.5 },
    ];

    for (const condition of conditions) {
      await prisma.phoneCondition.create({
        data: {
          ...condition,
          isActive: true,
          order: 0,
        },
      });
    }
    console.log(`✓ Created ${conditions.length} phone conditions`);

    // Seed multi-factor condition attribute groups and options
    const attributeGroups = [
      { key: 'battery', label: 'Battery Health', description: 'Maximum capacity or changed battery' },
      { key: 'faceid', label: 'Face ID', description: 'Face unlock and authentication status' },
      { key: 'screen', label: 'Screen', description: 'Original vs changed, cracked' },
      { key: 'backglass', label: 'Back Glass', description: 'Cosmetic condition of rear glass' },
      { key: 'body', label: 'Body Condition', description: 'Frame scratches, dents' },
      { key: 'sim', label: 'SIM Type', description: 'Physical SIM vs eSIM' },
    ];

    const createdGroups = {};
    for (const [idx, g] of attributeGroups.entries()) {
      const group = await prisma.conditionAttributeGroup.upsert({
        where: { key: g.key },
        update: { label: g.label, description: g.description, order: idx, isActive: true },
        create: { key: g.key, label: g.label, description: g.description, order: idx, isActive: true },
      });
      createdGroups[g.key] = group.id;
    }
    console.log(`✓ Created/updated ${attributeGroups.length} attribute groups`);

    const attributeOptionsByGroup = {
      battery: [
        { value: '90+', label: '90% and above', priceModifier: 1.0 },
        { value: '84-90', label: '84-90%', priceModifier: 0.95 },
        { value: '79-84', label: '79-84%', priceModifier: 0.9 },
        { value: '78-', label: '78% and below', priceModifier: 0.8 },
        { value: 'changed', label: 'Changed Battery (Non-Original)', priceModifier: 0.85 },
      ],
      faceid: [
        { value: 'working', label: 'Face ID Working', priceModifier: 1.0 },
        { value: 'not-working', label: 'No Face ID', priceModifier: 0.85 },
      ],
      screen: [
        { value: 'mint', label: 'Mint Screen (Original)', priceModifier: 1.0 },
        { value: 'changed', label: 'Changed Screen (Non-Original)', priceModifier: 0.9 },
        { value: 'cracked', label: 'Cracked Screen', priceModifier: 0.75 },
      ],
      backglass: [
        { value: 'mint', label: 'Mint (No scratches/dents)', priceModifier: 1.0 },
        { value: 'minor', label: 'Small scratches/dents', priceModifier: 0.95 },
        { value: 'broken', label: 'Broken back glass', priceModifier: 0.8 },
      ],
      body: [
        { value: 'mint', label: 'No scratches/dents', priceModifier: 1.0 },
        { value: 'minor', label: 'Small scratches/dents', priceModifier: 0.95 },
        { value: 'dents', label: 'Dents/major scratches', priceModifier: 0.85 },
      ],
      sim: [
        { value: 'physical', label: 'Physical SIM', priceModifier: 1.0 },
        { value: 'esim', label: 'Physical SIM plus eSIM', priceModifier: 1.0 },
      ],
    };

    for (const [key, options] of Object.entries(attributeOptionsByGroup)) {
      const groupId = createdGroups[key];
      let order = 0;
      for (const opt of options) {
        await prisma.conditionAttributeOption.upsert({
          where: {
            // composite unique not directly supported by upsert, emulate via find + create/update
            // but we can use a workaround by querying first
            // We'll implement manual logic below
            id: 'noop',
          },
          update: {},
          create: { groupId, value: opt.value, label: opt.label, description: null, priceModifier: opt.priceModifier, order: order++, isActive: true },
        }).catch(async () => {
          const existing = await prisma.conditionAttributeOption.findFirst({ where: { groupId, value: opt.value } });
          if (existing) {
            await prisma.conditionAttributeOption.update({
              where: { id: existing.id },
              data: { label: opt.label, priceModifier: opt.priceModifier, order: order - 1, isActive: true },
            });
          } else {
            await prisma.conditionAttributeOption.create({
              data: { groupId, value: opt.value, label: opt.label, priceModifier: opt.priceModifier, order: order - 1, isActive: true },
            });
          }
        });
      }
    }
    console.log('✓ Seeded attribute options for groups');

    console.log('✓ Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
