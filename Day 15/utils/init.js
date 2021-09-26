const s = require("connect-redis");
const sequelize = require("../database");
const product = require("../models/product");

sequelize
	.sync()
	.then((...a) => {
		return sequelize.authenticate();
	})
	.then(async (...a) => {
		const now = Date.now();
		for (let i = 0; i < 100; i++) {
			const productId = now + i;
			await product.create({
				title: `product title ${productId}`,
				price: Math.floor(100 + Math.random() * 10000),
				count: Math.floor(1 + Math.random() * 1000),
				description: `product description ${productId}`,
				image: `https://picsum.photos/100?products=${productId}`,
			});
		}
	})
	.catch(async (e) => {
		await sequelize.close();
		console.log(e);
	})
	.catch((e) => console.log(e));
