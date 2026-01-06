import { PrismaClient } from '../app/generated/prisma';

const prisma = new PrismaClient();

async function checkConditionAttributes() {
    console.log('Checking condition attribute groups and options...\n');
    
    // Check groups
    const groups = await prisma.conditionAttributeGroup.findMany({
        orderBy: { order: 'asc' },
        include: {
            options: {
                orderBy: { order: 'asc' }
            }
        }
    });
    
    console.log(`Found ${groups.length} condition attribute groups:\n`);
    
    groups.forEach((group, index) => {
        console.log(`${index + 1}. ${group.label} (${group.key})`);
        console.log(`   Active: ${group.isActive}`);
        console.log(`   Description: ${group.description || 'None'}`);
        console.log(`   Options (${group.options.length}):`);
        
        group.options.forEach((option, optIndex) => {
            console.log(`     ${optIndex + 1}. ${option.label} (${option.value}) - ${(option.priceModifier * 100)}% - Active: ${option.isActive}`);
        });
        console.log('');
    });
    
    await prisma.$disconnect();
}

checkConditionAttributes()
    .catch((error) => {
        console.error('Error:', error);
        process.exit(1);
    });