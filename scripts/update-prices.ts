import { PrismaClient } from '../app/generated/prisma';

const prisma = new PrismaClient();

// Hardcoded pricing data from the codebase
const correctPrices: Record<string, number> = {
    'x-64': 150000,
    'x-256': 170000,
    'xs-64': 180000,
    'xs-256': 200000,
    'xr-64': 170000,
    'xr-128': 200000,
    'xsmax-64': 220000,
    'xsmax-256': 250000,
    '11-64': 240000,
    '11-128': 270000,
    '11pro-64': 300000,
    '11pro-256': 330000,
    '11promax-64': 340000,
    '11promax-256': 370000,
    '12-64': 270000,
    '12-128': 310000,
    '12pro-128': 370000,
    '12pro-256': 400000,
    '12promax-128': 470000,
    '12promax-256': 500000,
    '13-128': 400000,
    '13-256': 440000,
    '13mini-128': 350000,
    '13mini-256': 380000,
    '13pro-128': 500000,
    '13pro-256': 560000,
    '13promax-128': 600000,
    '13promax-256': 650000,
    '14-128': 500000,
    '14-256': 550000,
    '14pro-128': 700000,
    '14pro-256': 750000,
    '14promax-128': 780000,
    '14promax-256': 820000,
    '14promax-512': 850000,
    '15-128': 750000,
    '15-256': 790000,
    '15pro-128': 900000,
    '15pro-256': 930000,
    '15pro-512': 980000,
};

async function updatePrices() {
    console.log('Updating phone model prices...');
    
    // Get all phone models
    const phoneModels = await prisma.phoneModel.findMany();
    
    let updated = 0;
    let notFound = 0;
    
    for (const model of phoneModels) {
        const correctPrice = correctPrices[model.value];
        
        if (correctPrice !== undefined) {
            // Update the price
            await prisma.phoneModel.update({
                where: { id: model.id },
                data: { basePrice: correctPrice }
            });
            
            console.log(`Updated ${model.label} (${model.value}): ${model.basePrice} → ${correctPrice}`);
            updated++;
        } else {
            console.log(`⚠️  No price found for ${model.label} (${model.value})`);
            notFound++;
        }
    }
    
    console.log(`\n✅ Updated ${updated} phone models`);
    if (notFound > 0) {
        console.log(`⚠️  ${notFound} models not found in pricing data`);
    }
    
    await prisma.$disconnect();
}

updatePrices()
    .catch((error) => {
        console.error('Error updating prices:', error);
        process.exit(1);
    });