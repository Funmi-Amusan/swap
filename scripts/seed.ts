import { prisma } from '../app/lib/prisma';

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

    console.log('✓ Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
