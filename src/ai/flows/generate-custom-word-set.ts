// src/ai/flows/generate-custom-word-set.ts
'use server';
/**
 * @fileOverview Generates custom word sets or retrieves quotes using GenAI.
 *
 * This module defines a Genkit flow to generate custom word sets based on user specifications
 * or fetch famous quotes for typing practice. It includes functionality for sanitizing
 * the generated content using a tool that filters out inappropriate language.
 *
 * @module generateCustomWordSet
 * - generateCustomWordSet - A function to generate a custom word set or fetch a quote.
 * - GenerateCustomWordSetInput - The input type for the generateCustomWordSet function.
 * - GenerateCustomWordSetOutput - The output type for the generateCustomWordSet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCustomWordSetInputSchema = z.object({
  type: z.enum(['words', 'quote']).describe('The type of content to generate: words or quote.'),
  topic: z.string().optional().describe('The topic or theme for generating words or a quote.'),
  length: z.number().optional().describe('The desired length of the word set or quote.'),
});
export type GenerateCustomWordSetInput = z.infer<typeof GenerateCustomWordSetInputSchema>;

const GenerateCustomWordSetOutputSchema = z.object({
  content: z.string().describe('The generated word set or quote, sanitized for inappropriate language.'),
});
export type GenerateCustomWordSetOutput = z.infer<typeof GenerateCustomWordSetOutputSchema>;

const detectInappropriateWords = ai.defineTool({
  name: 'detectInappropriateWords',
  description: 'Detects and filters out inappropriate or offensive words from a given text.',
  inputSchema: z.object({
    text: z.string().describe('The text to be checked for inappropriate words.'),
  }),
  outputSchema: z.boolean().describe('Returns true if the text contains inappropriate words, false otherwise.'),
},
async (input) => {
  // Mock implementation: Replace with actual inappropriate word detection logic.
  // This is a placeholder and should be replaced with a proper implementation
  // using a content moderation service or a custom word filter.
  const inappropriateWords = ['badword1', 'badword2', 'offensiveword'];
  const textLower = input.text.toLowerCase();
  return inappropriateWords.some(word => textLower.includes(word));
});


const generateWordSetPrompt = ai.definePrompt({
  name: 'generateWordSetPrompt',
  tools: [detectInappropriateWords],
  input: {schema: GenerateCustomWordSetInputSchema},
  output: {schema: GenerateCustomWordSetOutputSchema},
  prompt: `You are a word set generator that will return words based on the topic and type.

  Generate a {{type}} about {{topic}} with a length of {{length}}.

  Ensure that the generated content is appropriate and does not contain any offensive or inappropriate language. Use the detectInappropriateWords tool to check the generated content.
  `,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});



const generateCustomWordSetFlow = ai.defineFlow(
  {
    name: 'generateCustomWordSetFlow',
    inputSchema: GenerateCustomWordSetInputSchema,
    outputSchema: GenerateCustomWordSetOutputSchema,
  },
  async input => {
    const {output} = await generateWordSetPrompt(input);
    return output!;
  }
);

export async function generateCustomWordSet(input: GenerateCustomWordSetInput): Promise<GenerateCustomWordSetOutput> {
  return generateCustomWordSetFlow(input);
}
