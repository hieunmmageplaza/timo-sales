export async function getNotifications(shopify, shopId) {
  // const orders = await shopify.order.list({status: 'any', limit: 20});
  // const products = await shopify.product.list({
  //   id: orders.map(order => order.line_items[0].product_id)
  // });

  // return orders.map(order => {
  //   return {
  //     firstName: order.shipping_address.first_name || 'Guest',
  //     city: order.shipping_address.city || 'Hanoi',
  //     country: order.shipping_address.country || 'Vietnam',
  //     shopId: shopId || '',
  //     timestamp: order.created_at || '',
  //     productName: order.line_items[0].title || 'Sport T-shirt',
  //     productId: order.line_items[0].product_id || 111,
  //     productImage: products.find(p => p.id === order.line_items[0].product_id).image.src || null
  //   };
  // });
  return [
    {
      firstName: 'timo',
      city: 'Hanoi',
      country: 'Vietnam',
      shopId: shopId,
      timeStamp: new Date(),
      productName: 'Iphone16',
      productId: '1',
      productImage:
        'https://hieutimonew.myshopify.com/cdn/shop/files/Main_0a4e9096-021a-4c1e-8750-24b233166a12.jpg?v=1733042401&width=990'
    },
    {
      firstName: 'Hieu',
      city: 'HCM',
      country: 'Vietnam',
      shopId: shopId,
      timeStamp: new Date(),
      productName: 'Iphone17',
      productId: '2',
      productImage:
        'https://hieutimonew.myshopify.com/cdn/shop/files/Main_0a4e9096-021a-4c1e-8750-24b233166a12.jpg?v=1733042401&width=990'
    }
  ];
}
