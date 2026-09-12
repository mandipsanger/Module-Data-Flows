let order = [
  { itemName: "Hot cakes", quantity: 1, unitPricePence: 232 },
  { itemName: "Apple Pie", quantity: 2, unitPricePence: 139 },
  { itemName: "Egg McMuffin", quantity: 1, unitPricePence: 280 },
  { itemName: "Sausage McMuffin", quantity: 1, unitPricePence: 300 },
  { itemName: "Hot Coffee", quantity: 2, unitPricePence: 100 },
  { itemName: "Hash Brown", quantity: 4, unitPricePence: 40 },
];
let totalCost = 0;

for (const { itemName, quantity, unitPricePence } of order) {
  const itemTotal = quantity * unitPricePence;

  console.log(
    `${quantity}       ${itemName.padEnd(20)}${(itemTotal / 100).toFixed(2)}`
  );

  totalCost += itemTotal;
}

console.log(`Total: ${(totalCost / 100).toFixed(2)}`);
