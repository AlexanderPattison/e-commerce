const { Product } = require('./models');

async function seed() {
    try {
        await Product.create({ name: 'Sample Product 1', price: 10.99 });
        await Product.create({ name: 'Sample Product 2', price: 20.49 });
        await Product.create({ name: 'Sample Product 3', price: 5.99 });
        console.log('Products seeded');
    } catch (error) {
        console.error('Error seeding products:', error);
    }
}

seed();
