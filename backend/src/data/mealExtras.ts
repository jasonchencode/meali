/**
 * Demo-only rich content merged onto meals for the mobile detail screen.
 * Images use Unsplash hotlinks; links are real public pages (recipes, guides, video).
 */

export type MealResourceKind = "article" | "video" | "guide";

export interface MealResource {
  title: string;
  url: string;
  kind: MealResourceKind;
}

export interface MealDemoFields {
  recipeSteps: string[];
  imageUrl: string;
  resources: MealResource[];
}

const IMG = {
  eggs: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1200&q=80",
  rice: "https://images.unsplash.com/photo-1512058564366-18510be036db?w=1200&q=80",
  oats: "https://images.unsplash.com/photo-1517673409767-7a91456be88e?w=1200&q=80",
  stirfry: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=1200&q=80",
  pasta: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&q=80",
  congee: "https://images.unsplash.com/photo-1547592166-23abf45744f3?w=1200&q=80",
  soup: "https://images.unsplash.com/photo-1547592166-23abf45744f3?w=1200&q=80",
  friedrice: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=1200&q=80",
  salmon: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&q=80",
  chicken: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200&q=80",
  curry: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=1200&q=80",
  smoothie: "https://images.unsplash.com/photo-1553530979-7ee7a14e0c22?w=1200&q=80",
  tacos: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=1200&q=80",
  peppers: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=1200&q=80",
  lamb: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=80",
  steak: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=1200&q=80",
  bisque: "https://images.unsplash.com/photo-1547592166-23abf45744f3?w=1200&q=80",
  sushi: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&q=80",
  risotto: "https://images.unsplash.com/photo-1476124369491-e7ef712d6e72?w=1200&q=80",
  duck: "https://images.unsplash.com/photo-1517284870662-f563f0a1c1ca?w=1200&q=80",
};

export const MEAL_DEMOS: Record<string, MealDemoFields> = {
  "1": {
    imageUrl: IMG.eggs,
    recipeSteps: [
      "Crack eggs into a bowl, add a pinch of salt and pepper, and beat until the yolks and whites are just combined.",
      "Heat a nonstick pan over medium-low, melt butter, and pour in the eggs.",
      "Fold gently with a spatula until softly set but still a little creamy.",
      "Toast bread, butter lightly, and serve the eggs on top.",
    ],
    resources: [
      {
        title: "How to scramble eggs (Serious Eats)",
        url: "https://www.seriouseats.com/how-to-scramble-eggs-recipe",
        kind: "article",
      },
      {
        title: "Quick breakfast tips (BBC Good Food)",
        url: "https://www.bbcgoodfood.com/howto/guide/how-make-scrambled-eggs",
        kind: "guide",
      },
    ],
  },
  "2": {
    imageUrl: IMG.rice,
    recipeSteps: [
      "Rinse rice until water runs mostly clear; add water per package ratio in a microwave-safe bowl.",
      "Cover and microwave until rice is tender; rest 5 minutes.",
      "Warm black beans with cumin, garlic powder, and salt.",
      "Serve beans over rice and adjust seasoning to taste.",
    ],
    resources: [
      {
        title: "Cooking rice in the microwave",
        url: "https://www.bbcgoodfood.com/howto/guide/how-cook-rice",
        kind: "guide",
      },
      {
        title: "Beans & rice nutrition",
        url: "https://www.hsph.harvard.edu/nutritionsource/food-features/beans/",
        kind: "article",
      },
    ],
  },
  "3": {
    imageUrl: IMG.oats,
    recipeSteps: [
      "Combine oats, water, and a pinch of salt in a microwave-safe bowl.",
      "Microwave in short bursts, stirring, until thick and creamy.",
      "Slice banana and stir peanut butter into hot oats.",
      "Top with banana slices and an extra drizzle of peanut butter if you like.",
    ],
    resources: [
      {
        title: "Overnight oats ideas (BBC Good Food)",
        url: "https://www.bbcgoodfood.com/recipes/collection/oats-recipes",
        kind: "article",
      },
      {
        title: "Oatmeal basics (video)",
        url: "https://www.youtube.com/watch?v=5_bVkbG1ZCo",
        kind: "video",
      },
    ],
  },
  "4": {
    imageUrl: IMG.stirfry,
    recipeSteps: [
      "Prep vegetables and mince garlic; mix soy sauce with a splash of sesame oil.",
      "Heat oil in a wok or large pan over high heat until shimmering.",
      "Stir-fry vegetables and garlic until crisp-tender.",
      "Add sauce, toss to coat, and serve immediately.",
    ],
    resources: [
      {
        title: "Stir-fry technique (Serious Eats)",
        url: "https://www.seriouseats.com/stir-fry-recipes",
        kind: "article",
      },
      {
        title: "Soy sauce & umami",
        url: "https://www.bbcgoodfood.com/howto/guide/ultimate-guide-soy-sauce",
        kind: "guide",
      },
    ],
  },
  "5": {
    imageUrl: IMG.pasta,
    recipeSteps: [
      "Boil salted water and cook spaghetti until al dente; reserve a splash of pasta water.",
      "Sauté garlic in olive oil, add crushed tomatoes, basil, and salt; simmer briefly.",
      "Toss pasta with sauce, adding pasta water to loosen if needed.",
      "Serve with an extra drizzle of olive oil or chili flakes if desired.",
    ],
    resources: [
      {
        title: "Marinara fundamentals",
        url: "https://www.seriouseats.com/easy-italian-american-red-sauce-recipe",
        kind: "article",
      },
      {
        title: "Pasta cooking guide",
        url: "https://www.bbcgoodfood.com/howto/guide/how-cook-pasta",
        kind: "guide",
      },
    ],
  },
  "6": {
    imageUrl: IMG.congee,
    recipeSteps: [
      "Rinse rice and combine with water in the rice cooker using a porridge setting or extra water.",
      "Cook until broken down and creamy; stir occasionally if your cooker allows.",
      "Finely slice green onions and prep ginger and soy sauce.",
      "Serve hot congee topped with green onion, ginger, and soy sauce.",
    ],
    resources: [
      {
        title: "Congee / jook overview",
        url: "https://www.seriouseats.com/congee-rice-porridge",
        kind: "article",
      },
      {
        title: "Rice cooker tips",
        url: "https://www.bbcgoodfood.com/howto/guide/how-use-rice-cooker",
        kind: "guide",
      },
    ],
  },
  "7": {
    imageUrl: IMG.soup,
    recipeSteps: [
      "Dice onion and garlic; rinse lentils.",
      "Sauté onion and garlic, add cumin, then lentils and broth; simmer until lentils break down.",
      "Blend partially for texture or leave chunky.",
      "Finish with lemon juice and adjust salt.",
    ],
    resources: [
      {
        title: "Red lentil soup ideas",
        url: "https://www.bbcgoodfood.com/recipes/collection/lentil-soup-recipes",
        kind: "article",
      },
      {
        title: "Lentils nutrition",
        url: "https://www.hsph.harvard.edu/nutritionsource/food-features/lentils/",
        kind: "guide",
      },
    ],
  },
  "8": {
    imageUrl: IMG.friedrice,
    recipeSteps: [
      "Dice chicken small; beat eggs; have cold cooked rice ready.",
      "Scramble eggs in a hot pan, then set aside.",
      "Stir-fry chicken until cooked through; add vegetables, garlic, and rice.",
      "Add soy sauce, fold in eggs, and toss on high heat until steaming hot.",
    ],
    resources: [
      {
        title: "Fried rice technique",
        url: "https://www.seriouseats.com/chinese-fried-rice-recipe",
        kind: "article",
      },
      {
        title: "Food safety: chicken",
        url: "https://www.canada.ca/en/health-canada/services/general-food-safety-tips.html",
        kind: "guide",
      },
    ],
  },
  "9": {
    imageUrl: IMG.salmon,
    recipeSteps: [
      "Preheat oven; toss chopped vegetables with oil, salt, and pepper.",
      "Season salmon and place on a sheet with vegetables.",
      "Roast until salmon flakes easily and vegetables are tender.",
      "Squeeze lemon over top before serving.",
    ],
    resources: [
      {
        title: "Roasted salmon (BBC Good Food)",
        url: "https://www.bbcgoodfood.com/recipes/collection/salmon-recipes",
        kind: "article",
      },
      {
        title: "Omega-3 & fish",
        url: "https://www.hsph.harvard.edu/nutritionsource/what-should-you-eat/fats-and-cholesterol/types-of-fat/omega-3-fats/",
        kind: "guide",
      },
    ],
  },
  "10": {
    imageUrl: IMG.chicken,
    recipeSteps: [
      "Pat thighs dry; toss with oil and spices.",
      "Preheat air fryer; arrange thighs in a single layer.",
      "Air fry until skin is crisp and internal temperature is safe.",
      "Rest a few minutes before serving.",
    ],
    resources: [
      {
        title: "Air fryer chicken tips",
        url: "https://www.bbcgoodfood.com/howto/guide/air-fryer-guide",
        kind: "guide",
      },
      {
        title: "Safe cooking temperatures",
        url: "https://www.canada.ca/en/health-canada/services/general-food-safety-tips/safe-internal-cooking-temperatures.html",
        kind: "article",
      },
    ],
  },
  "11": {
    imageUrl: IMG.curry,
    recipeSteps: [
      "Sauté onion and garlic in oil using sauté mode; add curry powder.",
      "Add chicken and brown lightly; pour in coconut milk.",
      "Pressure cook until chicken is tender; natural release briefly.",
      "Season to taste and serve with rice.",
    ],
    resources: [
      {
        title: "Instant Pot curry basics",
        url: "https://www.seriouseats.com/instant-pot-recipes",
        kind: "article",
      },
      {
        title: "Coconut milk curries",
        url: "https://www.bbcgoodfood.com/recipes/collection/curry-recipes",
        kind: "guide",
      },
    ],
  },
  "12": {
    imageUrl: IMG.smoothie,
    recipeSteps: [
      "Add frozen fruit, banana, and a splash of liquid to the blender.",
      "Blend until thick and smooth; scrape down sides as needed.",
      "Pour into a bowl; top with granola, chia, and almond butter.",
      "Eat immediately while cold.",
    ],
    resources: [
      {
        title: "Smoothie bowl ideas",
        url: "https://www.bbcgoodfood.com/recipes/collection/smoothie-bowl-recipes",
        kind: "article",
      },
      {
        title: "Blender safety & tips",
        url: "https://www.youtube.com/watch?v=5_bVkbG1ZCo",
        kind: "video",
      },
    ],
  },
  "13": {
    imageUrl: IMG.tacos,
    recipeSteps: [
      "Season shrimp; pan-fry until pink and lightly charred.",
      "Warm tortillas in a dry pan.",
      "Toss slaw with lime juice.",
      "Fill tortillas with shrimp and slaw; serve with lime wedges.",
    ],
    resources: [
      {
        title: "Shrimp tacos inspiration",
        url: "https://www.seriouseats.com/shrimp-tacos-recipe",
        kind: "article",
      },
      {
        title: "Fish & shellfish handling",
        url: "https://www.canada.ca/en/health-canada/services/general-food-safety-tips/fish-shellfish.html",
        kind: "guide",
      },
    ],
  },
  "14": {
    imageUrl: IMG.peppers,
    recipeSteps: [
      "Halve peppers and remove seeds; par-cook if you like softer shells.",
      "Mix rice, beans, cheese, tomatoes, and cumin.",
      "Stuff peppers and bake until peppers are tender and filling is hot.",
      "Rest briefly before serving.",
    ],
    resources: [
      {
        title: "Stuffed peppers recipes",
        url: "https://www.bbcgoodfood.com/recipes/collection/stuffed-pepper-recipes",
        kind: "article",
      },
      {
        title: "Bell peppers nutrition",
        url: "https://www.hsph.harvard.edu/nutritionsource/food-features/bell-peppers/",
        kind: "guide",
      },
    ],
  },
  "15": {
    imageUrl: IMG.lamb,
    recipeSteps: [
      "Marinate chops with garlic, herbs, oil, salt, and pepper.",
      "Preheat oven; sear chops in a hot pan if desired.",
      "Roast until desired doneness; rest before slicing.",
      "Serve with pan juices.",
    ],
    resources: [
      {
        title: "Roasting lamb (BBC Good Food)",
        url: "https://www.bbcgoodfood.com/recipes/collection/lamb-recipes",
        kind: "article",
      },
      {
        title: "Meat rest time",
        url: "https://www.seriouseats.com/meat-temperature-guide",
        kind: "guide",
      },
    ],
  },
  "16": {
    imageUrl: IMG.steak,
    recipeSteps: [
      "Salt steaks ahead if time allows; bring toward room temp briefly before cooking.",
      "Sear in a hot pan; add butter, garlic, and rosemary to baste.",
      "Cook to target doneness; rest on a board.",
      "Slice against the grain and serve.",
    ],
    resources: [
      {
        title: "Pan-seared steak (Serious Eats)",
        url: "https://www.seriouseats.com/pan-seared-steak-recipe",
        kind: "article",
      },
      {
        title: "Steak doneness temps",
        url: "https://www.canada.ca/en/health-canada/services/general-food-safety-tips/safe-internal-cooking-temperatures.html",
        kind: "guide",
      },
    ],
  },
  "17": {
    imageUrl: IMG.bisque,
    recipeSteps: [
      "Sauté aromatics; add tomato paste and brandy; reduce.",
      "Add stock and simmer with lobster; blend until smooth.",
      "Stir in cream; season carefully.",
      "Strain if you want a silkier soup; garnish and serve hot.",
    ],
    resources: [
      {
        title: "Seafood soups",
        url: "https://www.bbcgoodfood.com/recipes/collection/seafood-soup-recipes",
        kind: "article",
      },
      {
        title: "Blender hot liquids safely",
        url: "https://www.seriouseats.com/blender-safety",
        kind: "guide",
      },
    ],
  },
  "18": {
    imageUrl: IMG.sushi,
    recipeSteps: [
      "Rinse and cook sushi rice; season with vinegar, sugar, and salt while warm.",
      "Slice fish and avocado thinly.",
      "Layer fish and avocado over rice in a bowl.",
      "Top with sesame seeds; serve with soy sauce.",
    ],
    resources: [
      {
        title: "Sushi rice basics",
        url: "https://www.seriouseats.com/sushi-rice-recipe",
        kind: "article",
      },
      {
        title: "Raw fish food safety",
        url: "https://www.canada.ca/en/health-canada/services/general-food-safety-tips/fish-shellfish.html",
        kind: "guide",
      },
    ],
  },
  "19": {
    imageUrl: IMG.risotto,
    recipeSteps: [
      "Sauté mushrooms and onion; add arborio rice to toast briefly.",
      "Add hot broth a ladle at a time, stirring until absorbed.",
      "Finish with butter, parmesan, and truffle oil.",
      "Rest briefly; serve creamy.",
    ],
    resources: [
      {
        title: "Risotto technique",
        url: "https://www.seriouseats.com/risotto-recipe",
        kind: "article",
      },
      {
        title: "Mushroom cooking tips",
        url: "https://www.bbcgoodfood.com/howto/guide/how-cook-mushrooms",
        kind: "guide",
      },
    ],
  },
  "20": {
    imageUrl: IMG.duck,
    recipeSteps: [
      "Score duck skin; salt and rest skin-side up to dry slightly.",
      "Air fry or sear skin-down until crisp; flip to finish cooking.",
      "Simmer cherries with honey and balsamic for a quick sauce.",
      "Slice duck; serve with sauce.",
    ],
    resources: [
      {
        title: "Duck breast tips",
        url: "https://www.bbcgoodfood.com/recipes/collection/duck-recipes",
        kind: "article",
      },
      {
        title: "Poultry doneness",
        url: "https://www.canada.ca/en/health-canada/services/general-food-safety-tips/safe-internal-cooking-temperatures.html",
        kind: "guide",
      },
    ],
  },
};
