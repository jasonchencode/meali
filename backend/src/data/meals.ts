export interface Meal {
  id: string;
  name: string;
  description: string;
  equipment: string[];
  diets: string[];
  budget: "low" | "medium" | "high";
}

// A meal is included if the user has ALL required equipment,
// the meal is compatible with ALL of the user's diet restrictions,
// and the meal's budget level is <= the user's budget level.

const meals: Meal[] = [
  // Low budget
  {
    id: "1",
    name: "Scrambled Eggs on Toast",
    description: "Simple scrambled eggs with buttered toast.",
    equipment: ["stovetop", "toaster"],
    diets: ["vegetarian"],
    budget: "low",
  },
  {
    id: "2",
    name: "Microwave Rice & Black Beans",
    description: "Seasoned black beans over steamed rice.",
    equipment: ["microwave"],
    diets: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    budget: "low",
  },
  {
    id: "3",
    name: "Peanut Butter Banana Oats",
    description: "Oatmeal topped with peanut butter and banana slices.",
    equipment: ["microwave"],
    diets: ["vegetarian", "vegan", "dairy-free"],
    budget: "low",
  },
  {
    id: "4",
    name: "Veggie Stir Fry",
    description: "Mixed vegetables stir-fried with soy sauce and garlic.",
    equipment: ["stovetop"],
    diets: ["vegetarian", "vegan", "dairy-free"],
    budget: "low",
  },
  {
    id: "5",
    name: "Pasta with Tomato Sauce",
    description: "Classic spaghetti with marinara sauce.",
    equipment: ["stovetop"],
    diets: ["vegetarian", "vegan", "dairy-free"],
    budget: "low",
  },
  {
    id: "6",
    name: "Rice Cooker Congee",
    description: "Comforting rice porridge with green onions and soy sauce.",
    equipment: ["rice cooker"],
    diets: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    budget: "low",
  },
  {
    id: "7",
    name: "Lentil Soup",
    description: "Hearty red lentil soup with cumin and lemon.",
    equipment: ["stovetop"],
    diets: ["vegetarian", "vegan", "gluten-free", "dairy-free", "halal", "kosher"],
    budget: "low",
  },

  // Medium budget
  {
    id: "8",
    name: "Chicken Fried Rice",
    description: "Fried rice with diced chicken, eggs, and vegetables.",
    equipment: ["stovetop"],
    diets: ["dairy-free", "halal"],
    budget: "medium",
  },
  {
    id: "9",
    name: "Baked Salmon with Veggies",
    description: "Oven-baked salmon fillet with roasted seasonal vegetables.",
    equipment: ["oven"],
    diets: ["gluten-free", "dairy-free", "pescatarian", "halal", "kosher"],
    budget: "medium",
  },
  {
    id: "10",
    name: "Air Fryer Chicken Thighs",
    description: "Crispy seasoned chicken thighs cooked in the air fryer.",
    equipment: ["air fryer"],
    diets: ["gluten-free", "dairy-free", "halal"],
    budget: "medium",
  },
  {
    id: "11",
    name: "Instant Pot Chicken Curry",
    description: "Tender chicken in a fragrant coconut curry sauce.",
    equipment: ["instant pot"],
    diets: ["gluten-free", "dairy-free", "halal"],
    budget: "medium",
  },
  {
    id: "12",
    name: "Blended Smoothie Bowl",
    description: "Thick blended fruit base topped with granola and seeds.",
    equipment: ["blender"],
    diets: ["vegetarian", "vegan", "gluten-free", "dairy-free"],
    budget: "medium",
  },
  {
    id: "13",
    name: "Shrimp Tacos",
    description: "Seasoned pan-fried shrimp in warm tortillas with slaw.",
    equipment: ["stovetop"],
    diets: ["pescatarian", "dairy-free"],
    budget: "medium",
  },
  {
    id: "14",
    name: "Stuffed Bell Peppers",
    description: "Bell peppers filled with rice, beans, and cheese, baked until tender.",
    equipment: ["oven"],
    diets: ["vegetarian", "gluten-free"],
    budget: "medium",
  },

  // High budget
  {
    id: "15",
    name: "Oven-Roasted Lamb Chops",
    description: "Herb-marinated lamb chops roasted to perfection.",
    equipment: ["oven"],
    diets: ["gluten-free", "dairy-free", "halal"],
    budget: "high",
  },
  {
    id: "16",
    name: "Pan-Seared Ribeye Steak",
    description: "Butter-basted ribeye with garlic and rosemary.",
    equipment: ["stovetop"],
    diets: ["gluten-free", "halal"],
    budget: "high",
  },
  {
    id: "17",
    name: "Lobster Bisque",
    description: "Creamy blended lobster soup with a touch of cream and brandy.",
    equipment: ["stovetop", "blender"],
    diets: ["pescatarian", "kosher"],
    budget: "high",
  },
  {
    id: "18",
    name: "Sushi Bowl",
    description: "Sashimi-grade fish over seasoned rice with avocado and sesame.",
    equipment: ["rice cooker"],
    diets: ["pescatarian", "gluten-free", "dairy-free", "kosher"],
    budget: "high",
  },
  {
    id: "19",
    name: "Truffle Mushroom Risotto",
    description: "Creamy arborio rice with wild mushrooms and truffle oil.",
    equipment: ["stovetop"],
    diets: ["vegetarian", "gluten-free"],
    budget: "high",
  },
  {
    id: "20",
    name: "Air Fryer Duck Breast",
    description: "Crispy-skin duck breast with a cherry reduction.",
    equipment: ["air fryer", "stovetop"],
    diets: ["gluten-free", "dairy-free", "halal"],
    budget: "high",
  },
];

export default meals;
