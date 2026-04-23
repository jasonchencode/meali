const HALAL_BLOCKLIST = [
  "pork", "bacon", "ham", "lard", "gelatin", "pepperoni", "salami",
  "prosciutto", "pancetta", "chorizo", "sausage",
  "wine", "beer", "alcohol", "rum", "brandy", "whiskey", "vodka",
  "liqueur", "sake", "mirin",
];

const KOSHER_BLOCKLIST = [
  "pork", "bacon", "ham", "lard", "pepperoni", "salami", "prosciutto",
  "pancetta", "chorizo",
  "shrimp", "lobster", "crab", "clams", "oysters", "mussels", "scallops",
  "squid", "octopus",
];

function containsBlocklisted(ingredients: string[], blocklist: string[]): boolean {
  return ingredients.some((ingredient) =>
    blocklist.some((blocked) => ingredient.toLowerCase().includes(blocked))
  );
}

export function isHalal(ingredients: string[]): boolean {
  return !containsBlocklisted(ingredients, HALAL_BLOCKLIST);
}

export function isKosher(ingredients: string[]): boolean {
  return !containsBlocklisted(ingredients, KOSHER_BLOCKLIST);
}
