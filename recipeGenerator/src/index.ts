import 'dotenv/config';
import { googleAI } from '@genkit-ai/google-genai';
import { genkit, z } from 'genkit';

// Validate environment variable
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set');
}

// Initialize Genkit with the Google AI plugin
const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-2.5-flash', {
    temperature: 0.8,
  }),
});

// Define input schema
const RecipeInputSchema = z.object({
  ingredient: z.string().min(1).describe('Main ingredient or cuisine type'),
  dietaryRestrictions: z
    .string()
    .optional()
    .describe('Any dietary restrictions'),
});

// Define output schema
const RecipeSchema = z.object({
  title: z.string(),
  description: z.string(),
  prepTime: z.string(),
  cookTime: z.string(),
  servings: z.number(),
  ingredients: z.array(z.string()),
  instructions: z.array(z.string()),
  tips: z.array(z.string()).optional(),
});

// Define a recipe generator flow
export const recipeGeneratorFlow = ai.defineFlow(
  {
    name: 'recipeGeneratorFlow',
    inputSchema: RecipeInputSchema,
    outputSchema: RecipeSchema,
  },
  async (input) => {
    // Create a prompt based on the input
    // const prompt = `Create a recipe with the following requirements:
    //   Main ingredient: ${input.ingredient}
    //   Dietary restrictions: ${input.dietaryRestrictions || 'none'}`;
    const prompt = `
Create a complete recipe.

Requirements:
- Main ingredient: ${input.ingredient}
- Dietary restrictions: ${input.dietaryRestrictions ?? 'none'}

Include:
- Title
- Description
- Preparation time
- Cooking time
- Number of servings
- Ingredients list
- Step-by-step instructions
- Helpful cooking tips
`;

    // Generate structured recipe data using the same schema
    const { output } = await ai.generate({
      prompt,
      output: { schema: RecipeSchema },
    });

    if (!output) throw new Error('Failed to generate recipe');

    return output;
  },
);

// Run the flow
async function main() {
//   const recipe = await recipeGeneratorFlow({
//     ingredient: 'avocado',
//     dietaryRestrictions: 'vegetarian',
//   });

//   console.log(recipe);/
console.log('Starting recipe generation...');
    const recipe = await generateRecipe();
    console.log(JSON.stringify(recipe, null, 2));

}

async function generateRecipe() {
  let lastError:unknown;

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
              console.log(`Attempt ${attempt}...`);

      return await recipeGeneratorFlow({
        ingredient: 'avocado',
        dietaryRestrictions: 'vegetarian',
      });
    } catch (error) {
      lastError = error;

      console.log(`Attempt ${attempt} failed`);

      if (attempt < 3) {
  await new Promise((resolve) =>
    setTimeout(resolve, attempt * 2000)
  );
}
    }
  }

throw lastError instanceof Error
  ? lastError
  : new Error('Unknown error');}

// main().catch(console.error);
main().catch((error) => {
  console.error('Recipe generation failed');
  console.error(error);
});