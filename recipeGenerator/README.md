# 🍲 AI Recipe Generator

## Project Overview

The AI Recipe Generator is a command-line application that leverages the power of Artificial Intelligence (AI) to create unique and structured recipes based on user-specified ingredients and dietary restrictions. Built with the Genkit AI framework and Google Gemini, this tool provides a flexible way to generate culinary inspiration with detailed instructions and tips.

## Features List

*   **AI-Powered Generation**: Utilizes the Google Gemini `gemini-2.5-flash` model to generate creative and relevant recipes.
*   **Structured Output**: Ensures all generated recipes adhere to a predefined schema, providing consistent and easy-to-read information including title, ingredients, instructions, and more.
*   **Dietary Customization**: Allows users to specify dietary restrictions (e.g., "vegetarian", "gluten-free") to tailor recipe suggestions.
*   **Retry Logic**: Incorporates robust error handling with a retry mechanism (up to 3 attempts with exponential backoff) to ensure successful recipe generation even with transient API issues.

## Project Structure

The project is organized into the following key directories and files:
recipeGenerator/
├── package.json # Project metadata and dependencies
├── README.md # This documentation file
├── tsconfig.json # TypeScript compiler configuration
└── src/
└── index.ts # Main application logic, Genkit flow definition, and recipe generation

## Dependencies

The following npm packages are used in this project:

*   **`@genkit-ai/google-genai`**: The official Genkit plugin for integrating with Google AI models, specifically used for accessing Gemini.
*   **`dotenv`**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`. Essential for securely managing API keys.
*   **`genkit`**: The Genkit AI framework itself, providing the structure and utilities for building AI-powered applications.

### Development Dependencies

*   **`tsx`**: A TypeScript execution environment that allows running TypeScript files directly without a separate compilation step.
*   **`typescript`**: The TypeScript language compiler, enabling the use of static typing in JavaScript.

## Setup Instructions

To get the Recipe Generator up and running on your local machine, follow these steps:

### Prerequisites

*   **Node.js**: Ensure you have Node.js (LTS version recommended) and npm (Node Package Manager) installed. You can download it from [nodejs.org](https://nodejs.org/).
*   **Google Cloud Project & Gemini API Key**:
    *   You need a Google Cloud Project with the Gemini API enabled.
    *   Obtain a `GEMINI_API_KEY` from your Google Cloud project credentials.

### Installation

1.  **Clone the repository**:
    ```bash
    # git clone <repository_url>
    # cd recipeGenerator
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Create a `.env` file**:
    In the root of your `recipeGenerator` directory, create a file named `.env` and add your Google Gemini API key:
    ```
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
    ```
    Replace `"YOUR_GEMINI_API_KEY"` with your actual API key.

## Usage Guide

To run the recipe generator and customize its output:

1.  **Open `src/index.ts`**:
    Locate the `generateRecipe` function within `src/index.ts`.

2.  **Customize Recipe Parameters**:
    Modify the `ingredient` and `dietaryRestrictions` values within the `recipeGeneratorFlow` call:

    ```typescript
    // src/index.ts
    async function generateRecipe() {
      // ...
      return await recipeGeneratorFlow({
        ingredient: 'avocado', // Change this to your desired main ingredient
        dietaryRestrictions: 'vegetarian', // Add or remove dietary restrictions (e.g., 'vegan', 'gluten-free', or leave as 'none')
      });
      // ...
    }
    ```

3.  **Run the application**:
    ```bash
    npm run start # Assuming you have a start script, or use tsx directly
    # or
    npx tsx src/index.ts
    ```
    The generated recipe will be printed to your console in a structured JSON format.

## API Interface

The recipe generation process follows a clear input and output schema:

### Input Schema (`RecipeInputSchema`)

This schema defines the structure for the input provided to the recipe generation flow.

```typescript
const RecipeInputSchema = z.object({
  ingredient: z.string().min(1).describe('Main ingredient or cuisine type'),
  dietaryRestrictions: z
    .string()
    .optional()
    .describe('Any dietary restrictions'),
});
```
### Output Schema (`RecipeSchema`)

This schema defines the structured format for the AI-generated recipe output.
```typescript

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
```
### Output Schema (`RecipeSchema`)

This schema defines the structured format for the AI-generated recipe output.

```typescript
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
```
## How It Works

The Recipe Generator operates through a Genkit flow, orchestrating the interaction with the Google Gemini AI model to generate structured recipes. Here's a step-by-step breakdown:

1.  **Initialization**: The application initializes the Genkit AI framework, configuring it to use the `googleAI` plugin and specifying the `gemini-2.5-flash` model. Essential settings like `temperature` are also defined here.
2.  **Input Definition**: A `RecipeInputSchema` is defined using `zod` to validate and structure user input, ensuring that `ingredient` is a required string and `dietaryRestrictions` is an optional string.
3.  **Output Definition**: A `RecipeSchema` is also defined with `zod` to enforce a consistent and predictable structure for the AI-generated recipe output, including fields like title, ingredients, instructions, and more.
4.  **Flow Definition**: The `recipeGeneratorFlow` is the core of the application. It takes the validated user input, constructs a detailed prompt, and sends it to the configured Gemini model.
5.  **AI Generation**: The Gemini model processes the prompt and generates a recipe. Genkit then uses the `RecipeSchema` to ensure the AI's output conforms to the expected structure. If the output doesn't match the schema, Genkit attempts to re-prompt the model to correct it.
6.  **Error Handling & Retry**: The `generateRecipe` function wraps the flow execution with a retry mechanism. If the AI generation fails due to transient issues, it will retry up to 3 times with an exponential backoff, improving robustness.
7.  **Output Display**: Once a valid recipe is generated, it is logged to the console in a human-readable JSON format.

## Configuration Details

Key configuration parameters are set in `src/index.ts`:

*   **Model**: The `gemini-2.5-flash` model is explicitly selected for recipe generation.
*   **Temperature**: The `temperature` setting for the Gemini model is set to `0.8`. This value influences the creativity and randomness of the AI's output. A higher temperature (closer to 1.0) will result in more varied and surprising recipes, while a lower temperature (closer to 0.0) will produce more focused and predictable results.

## Error Handling

The application includes built-in safeguards to handle potential issues during recipe generation:

*   **API Key Validation**: It checks for the presence of `GEMINI_API_KEY` at startup and throws an error if it's missing, preventing the application from running without proper authentication.
*   **Retry Mechanism**: The `generateRecipe` function implements a robust retry mechanism:
    *   It attempts recipe generation up to **3 times**.
    *   Between failed attempts, it waits for an increasing duration (exponential backoff: 2 seconds after the first failure, 4 seconds after the second) to allow for transient API issues to resolve.
    *   If all retries fail, the last encountered error is re-thrown, providing clear indication of persistent problems.

## Technologies

*   **TypeScript**: A superset of JavaScript that adds static typing, enhancing code quality and maintainability.
*   **Node.js**: A JavaScript runtime environment that allows executing JavaScript code outside a web browser.
*   **Genkit AI Framework**: An open-source framework for building AI-powered applications, simplifying interaction with large language models.
*   **Google Gemini (`gemini-2.5-flash`)**: A powerful large language model from Google AI, used for generating creative and structured recipe content.
*   **Zod**: A TypeScript-first schema declaration and validation library, used for defining and enforcing the structure of input and output data.
*   **Dotenv**: A module to load environment variables from a `.env` file, ensuring secure handling of API keys.

## Future Enhancements

*   **Interactive CLI**: Implement a more interactive command-line interface to allow users to input ingredients and dietary restrictions directly without modifying the code.
*   **Web Interface**: Develop a simple web interface using a framework like React or Next.js for a more user-friendly experience.
*   **More Advanced Dietary Options**: Expand dietary restriction options to include allergies, calorie counts, or specific cuisine types.
*   **Recipe Saving/Exporting**: Add functionality to save generated recipes to a file (e.g., JSON, PDF) or a simple database.
*   **Ingredient Quantity & Units**: Enhance the `RecipeSchema` to include quantities and units for ingredients, providing more practical recipes.
*   **User Feedback**: Implement a mechanism for users to provide feedback on recipe quality, which could eventually be used to fine-tune the AI model.
*   **Unit Testing**: Add comprehensive unit tests for the Genkit flow and utility functions.
