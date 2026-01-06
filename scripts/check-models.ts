import { PrismaClient } from '../app/generated/prisma';

const prisma = new PrismaClient();

async function checkModels() {
    console.log('Checking current phone models in database...');
    
    const phoneModels = await prisma.phoneModel.findMany({
        select: {
            id: true,
            label: true,
            value: true,
            model: true,
            storage: true,
            basePrice: true
        },
        orderBy: { label: 'asc' }
    });
    
    console.log('\nCurrent phone models:');
    phoneModels.forEach((model, index) => {
        console.log(`${index + 1}. ${model.label} - Value: "${model.value}" - Model: "${model.model}" - Storage: "${model.storage}" - Price: ${model.basePrice}`);
    });
    
    await prisma.$disconnect();
}

checkModels()
    .catch((error) => {
        console.error('Error:', error);
        process.exit(1);
    });