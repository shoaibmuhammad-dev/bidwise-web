import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missin OPENAI_API_KEY environment variable");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default openai;
