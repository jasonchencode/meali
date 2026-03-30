import type { MealResource } from "./mealExtras";
import { MEAL_DEMOS } from "./mealExtras";

export interface Meal {
  id: string;
  name: string;
  description: string;
  equipment: string[];
  diets: string[];
  budget: "low" | "medium" | "high";
  ingredients: string[];
  calories: number;
  protein: number;
  /** Demo: step-by-step instructions for the detail screen */
  recipeSteps?: string[];
  imageUrl?: string;
  resources?: MealResource[];
}

// A meal is included if the user has ALL required equipment,
// the meal is compatible with ALL of the user's diet restrictions,
// and the meal's budget level is <= the user's budget level.

const mealsBase: Meal[] = [
  // Low budget
  {
    id: "1",
    name: "Scrambled Eggs on Toast",
    description: "Simple scrambled eggs with buttered toast.",
    equipment: ["stovetop", "toaster"],
    diets: ["vegetarian"],
    budget: "low",
    ingredients: ["3 eggs", "2 slices bread", "1 tbsp butter", "salt", "pepper"],
    calories: 380,
    protein: 20,
  },
  {
    id: "2",
    name: "Microwave Rice & Black Beans",
    description: "Seasoned black beans over steamed rice.",
    equipment: ["microwave"],
    diets: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    budget: "low",
    ingredients: ["1 cup white rice", "1 can black beans", "1 tsp cumin", "1 tsp garlic powder", "salt"],
    calories: 420,
    protein: 18,
  },
  {
    id: "3",
    name: "Peanut Butter Banana Oats",
    description: "Oatmeal topped with peanut butter and banana slices.",
    equipment: ["microwave"],
    diets: ["vegetarian", "vegan", "dairy-free"],
    budget: "low",
    ingredients: ["1 cup rolled oats", "1 banana", "2 tbsp peanut butter", "1 cup water", "pinch of salt"],
    calories: 450,
    protein: 14,
  },
  {
    id: "4",
    name: "Veggie Stir Fry",
    description: "Mixed vegetables stir-fried with soy sauce and garlic.",
    equipment: ["stovetop"],
    diets: ["vegetarian", "vegan", "dairy-free"],
    budget: "low",
    ingredients: ["2 cups mixed vegetables", "2 tbsp soy sauce", "3 cloves garlic", "1 tbsp oil", "1 tsp sesame oil"],
    calories: 280,
    protein: 8,
  },
  {
    id: "5",
    name: "Pasta with Tomato Sauce",
    description: "Classic spaghetti with marinara sauce.",
    equipment: ["stovetop"],
    diets: ["vegetarian", "vegan", "dairy-free"],
    budget: "low",
    ingredients: ["200g spaghetti", "1 can crushed tomatoes", "3 cloves garlic", "1 tbsp olive oil", "salt", "dried basil"],
    calories: 520,
    protein: 15,
  },
  {
    id: "6",
    name: "Rice Cooker Congee",
    description: "Comforting rice porridge with green onions and soy sauce.",
    equipment: ["rice cooker"],
    diets: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    budget: "low",
    ingredients: ["1 cup jasmine rice", "4 cups water", "2 green onions", "2 tbsp soy sauce", "1 tsp ginger"],
    calories: 310,
    protein: 7,
  },
  {
    id: "7",
    name: "Lentil Soup",
    description: "Hearty red lentil soup with cumin and lemon.",
    equipment: ["stovetop"],
    diets: ["vegetarian", "vegan", "gluten-free", "dairy-free", "halal", "kosher"],
    budget: "low",
    ingredients: ["1 cup red lentils", "1 onion", "2 cloves garlic", "1 tsp cumin", "1 lemon", "3 cups vegetable broth"],
    calories: 380,
    protein: 22,
  },

  // Medium budget
  {
    id: "8",
    name: "Chicken Fried Rice",
    description: "Fried rice with diced chicken, eggs, and vegetables.",
    equipment: ["stovetop"],
    diets: ["dairy-free", "halal"],
    budget: "medium",
    ingredients: ["2 cups cooked rice", "200g chicken breast", "2 eggs", "1 cup frozen peas and carrots", "3 tbsp soy sauce", "2 cloves garlic", "1 tbsp oil"],
    calories: 580,
    protein: 38,
  },
  {
    id: "9",
    name: "Baked Salmon with Veggies",
    description: "Oven-baked salmon fillet with roasted seasonal vegetables.",
    equipment: ["oven"],
    diets: ["gluten-free", "dairy-free", "pescatarian", "halal", "kosher"],
    budget: "medium",
    ingredients: ["2 salmon fillets", "1 zucchini", "1 bell pepper", "1 tbsp olive oil", "2 cloves garlic", "lemon", "salt", "pepper"],
    calories: 490,
    protein: 42,
  },
  {
    id: "10",
    name: "Air Fryer Chicken Thighs",
    description: "Crispy seasoned chicken thighs cooked in the air fryer.",
    equipment: ["air fryer"],
    diets: ["gluten-free", "dairy-free", "halal"],
    budget: "medium",
    ingredients: ["4 chicken thighs", "1 tsp paprika", "1 tsp garlic powder", "1 tsp onion powder", "1 tbsp olive oil", "salt", "pepper"],
    calories: 560,
    protein: 46,
  },
  {
    id: "11",
    name: "Instant Pot Chicken Curry",
    description: "Tender chicken in a fragrant coconut curry sauce.",
    equipment: ["instant pot"],
    diets: ["gluten-free", "dairy-free", "halal"],
    budget: "medium",
    ingredients: ["500g chicken breast", "1 can coconut milk", "2 tbsp curry powder", "1 onion", "3 cloves garlic", "1 tbsp oil", "salt"],
    calories: 620,
    protein: 48,
  },
  {
    id: "12",
    name: "Blended Smoothie Bowl",
    description: "Thick blended fruit base topped with granola and seeds.",
    equipment: ["blender"],
    diets: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    budget: "medium",
    ingredients: ["2 frozen bananas", "1 cup frozen berries", "1/4 cup granola", "1 tbsp chia seeds", "1 tbsp almond butter"],
    calories: 380,
    protein: 9,
  },
  {
    id: "13",
    name: "Shrimp Tacos",
    description: "Seasoned pan-fried shrimp in warm tortillas with slaw.",
    equipment: ["stovetop"],
    diets: ["pescatarian", "dairy-free"],
    budget: "medium",
    ingredients: ["300g shrimp", "6 small tortillas", "2 cups coleslaw mix", "1 lime", "1 tsp cumin", "1 tsp chili powder", "1 tbsp oil"],
    calories: 520,
    protein: 36,
  },
  {
    id: "14",
    name: "Stuffed Bell Peppers",
    description: "Bell peppers filled with rice, beans, and cheese, baked until tender.",
    equipment: ["oven"],
    diets: ["vegetarian", "gluten-free"],
    budget: "medium",
    ingredients: ["4 bell peppers", "1 cup cooked rice", "1 can kidney beans", "1 cup shredded cheese", "1 can diced tomatoes", "1 tsp cumin"],
    calories: 480,
    protein: 22,
  },

  // High budget
  {
    id: "15",
    name: "Oven-Roasted Lamb Chops",
    description: "Herb-marinated lamb chops roasted to perfection.",
    equipment: ["oven"],
    diets: ["gluten-free", "dairy-free", "halal"],
    budget: "high",
    ingredients: ["4 lamb chops", "3 cloves garlic", "2 tbsp olive oil", "1 tbsp fresh rosemary", "1 tbsp fresh thyme", "salt", "pepper"],
    calories: 680,
    protein: 52,
  },
  {
    id: "16",
    name: "Pan-Seared Ribeye Steak",
    description: "Butter-basted ribeye with garlic and rosemary.",
    equipment: ["stovetop"],
    diets: ["gluten-free", "halal"],
    budget: "high",
    ingredients: ["2 ribeye steaks", "3 tbsp butter", "4 cloves garlic", "2 sprigs rosemary", "salt", "black pepper"],
    calories: 780,
    protein: 58,
  },
  {
    id: "17",
    name: "Lobster Bisque",
    description: "Creamy blended lobster soup with a touch of cream and brandy.",
    equipment: ["stovetop", "blender"],
    diets: ["pescatarian", "kosher"],
    budget: "high",
    ingredients: ["2 lobster tails", "1 cup heavy cream", "1 onion", "2 cloves garlic", "2 tbsp tomato paste", "2 tbsp brandy", "2 cups seafood stock"],
    calories: 520,
    protein: 28,
  },
  {
    id: "18",
    name: "Sushi Bowl",
    description: "Sashimi-grade fish over seasoned rice with avocado and sesame.",
    equipment: ["rice cooker"],
    diets: ["pescatarian", "gluten-free", "dairy-free", "kosher"],
    budget: "high",
    ingredients: ["200g sashimi-grade tuna or salmon", "1 cup sushi rice", "1 avocado", "2 tbsp rice vinegar", "1 tbsp sesame seeds", "soy sauce"],
    calories: 580,
    protein: 38,
  },
  {
    id: "19",
    name: "Truffle Mushroom Risotto",
    description: "Creamy arborio rice with wild mushrooms and truffle oil.",
    equipment: ["stovetop"],
    diets: ["vegetarian", "gluten-free"],
    budget: "high",
    ingredients: ["1.5 cups arborio rice", "300g mixed wild mushrooms", "1/2 cup parmesan", "1 onion", "3 cups vegetable broth", "1 tbsp truffle oil", "2 tbsp butter"],
    calories: 640,
    protein: 18,
  },
  {
    id: "20",
    name: "Air Fryer Duck Breast",
    description: "Crispy-skin duck breast with a cherry reduction.",
    equipment: ["air fryer", "stovetop"],
    diets: ["gluten-free", "dairy-free", "halal"],
    budget: "high",
    ingredients: ["2 duck breasts", "1 cup cherries", "2 tbsp honey", "1 tbsp balsamic vinegar", "salt", "pepper"],
    calories: 620,
    protein: 44,
  },
];

const meals: Meal[] = mealsBase.map((m) => ({
  ...m,
  ...MEAL_DEMOS[m.id],
}));

export default meals;
