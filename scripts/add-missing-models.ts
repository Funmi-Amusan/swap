import { PrismaClient } from '../app/generated/prisma';

const prisma = new PrismaClient();

// Models from hardcoded data that might be missing from database
const missingModels = [
    // iPhone XR
    { label: 'iPhone XR 64GB', value: 'xr-64', model: 'iPhone XR', storage: '64GB', basePrice: 170000 },
    { label: 'iPhone XR 128GB', value: 'xr-128', model: 'iPhone XR', storage: '128GB', basePrice: 200000 },
    
    // iPhone 11 Pro Max
    { label: 'iPhone 11 Pro Max 64GB', value: '11promax-64', model: 'iPhone 11 Pro Max', storage: '64GB', basePrice: 340000 },
    { label: 'iPhone 11 Pro Max 256GB', value: '11promax-256', model: 'iPhone 11 Pro Max', storage: '256GB', basePrice: 370000 },
    
    // iPhone 12 Pro Max
    { label: 'iPhone 12 Pro Max 128GB', value: '12promax-128', model: 'iPhone 12 Pro Max', storage: '128GB', basePrice: 470000 },
    { label: 'iPhone 12 Pro Max 256GB', value: '12promax-256', model: 'iPhone 12 Pro Max', storage: '256GB', basePrice: 500000 },
    
    // iPhone 13 mini
    { label: 'iPhone 13 mini 128GB', value: '13mini-128', model: 'iPhone 13 mini', storage: '128GB', basePrice: 350000 },
    { label: 'iPhone 13 mini 256GB', value: '13mini-256', model: 'iPhone 13 mini', storage: '256GB', basePrice: 380000 },
    
    // iPhone 13 Pro Max
    { label: 'iPhone 13 Pro Max 128GB', value: '13promax-128', model: 'iPhone 13 Pro Max', storage: '128GB', basePrice: 600000 },
    { label: 'iPhone 13 Pro Max 256GB', value: '13promax-256', model: 'iPhone 13 Pro Max', storage: '256GB', basePrice: 650000 },
    
    // iPhone 14 Pro Max
    { label: 'iPhone 14 Pro Max 128GB', value: '14promax-128', model: 'iPhone 14 Pro Max', storage: '128GB', basePrice: 780000 },
    { label: 'iPhone 14 Pro Max 256GB', value: '14promax-256', model: 'iPhone 14 Pro Max', storage: '256GB', basePrice: 820000 },
    { label: 'iPhone 14 Pro Max 512GB', value: '14promax-512', model: 'iPhone 14 Pro Max', storage: '512GB', basePrice: 850000 },
    
    // iPhone 15 Pro Max and other variants
    { label: 'iPhone 15 Pro 512GB', value: '15pro-512', model: 'iPhone 15 Pro', storage: '512GB', basePrice: 980000 },
    { label: 'iPhone 15 Pro Max 256GB', value: '15promax-256', model: 'iPhone 15 Pro Max', storage: '256GB', basePrice: 1000000 },
    { label: 'iPhone 15 Pro Max 512GB', value: '15promax-512', model: 'iPhone 15 Pro Max', storage: '512GB', basePrice: 1050000 },
    
    // iPhone 16 variants
    { label: 'iPhone 16 512GB', value: '16-512', model: 'iPhone 16', storage: '512GB', basePrice: 1050000 },
];

// Update iPhone 16 Pro models with reasonable prices
const iPhone16ProUpdates = [
    { value: '16pro-128', price: 1100000 },
    { value: '16pro-256', price: 1150000 },
];

async function addMissingModelsAndUpdatePrices() {
    console.log('Adding missing phone models and updating iPhone 16 Pro prices...\n');
    
    let added = 0;
    let updated = 0;
    
    // Add missing models
    console.log('Adding missing models:');
    console.log('====================');
    
    for (const modelData of missingModels) {
        // Check if model already exists
        const existing = await prisma.phoneModel.findUnique({
            where: { value: modelData.value }
        });
        
        if (!existing) {
            await prisma.phoneModel.create({
                data: {
                    label: modelData.label,
                    value: modelData.value,
                    model: modelData.model,
                    storage: modelData.storage,
                    basePrice: modelData.basePrice,
                    isActive: true,
                    order: 0
                }
            });
            console.log(`✅ Added: ${modelData.label} (${modelData.value}) - ₦${modelData.basePrice.toLocaleString()}`);
            added++;
        } else {
            console.log(`✓ Already exists: ${modelData.label} (${modelData.value})`);
        }
    }
    
    // Update iPhone 16 Pro prices
    console.log('\nUpdating iPhone 16 Pro prices:');
    console.log('==============================');
    
    for (const update of iPhone16ProUpdates) {
        const model = await prisma.phoneModel.findUnique({
            where: { value: update.value }
        });
        
        if (model) {
            await prisma.phoneModel.update({
                where: { value: update.value },
                data: { basePrice: update.price }
            });
            console.log(`✅ Updated: ${model.label} (${update.value}): ₦${model.basePrice.toLocaleString()} → ₦${update.price.toLocaleString()}`);
            updated++;
        }
    }
    
    console.log('\n' + '='.repeat(50));
    console.log(`✅ Added ${added} new phone models`);
    console.log(`✅ Updated ${updated} iPhone 16 Pro prices`);
    
    await prisma.$disconnect();
}

addMissingModelsAndUpdatePrices()
    .catch((error) => {
        console.error('Error:', error);
        process.exit(1);
    });