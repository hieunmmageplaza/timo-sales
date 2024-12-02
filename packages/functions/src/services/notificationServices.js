export async function getNotifications(shopify, shopId) {
  const orders = await shopify.order.list({status: 'any', limit: 20});
  const products = await shopify.product.list({
    id: orders.map(order => order.line_items[0].product_id)
  });

  return orders.map(order => {
    return {
      firstName: order.billing_address.first_name || 'Guest',
      city: order.billing_address.city || 'Hanoi',
      country: order.billing_address.country || 'Vietnam',
      shopId: shopId || '',
      timestamp: order.created_at || '',
      productName: order.line_items[0].title || 'Sport T-shirt',
      productId: order.line_items[0].product_id || 111,
      productImage: products.find(p => p.id === order.line_items[0].product_id).image.src || null
    };
  });
}
