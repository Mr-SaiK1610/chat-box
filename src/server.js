import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { OpenAIApi, Configuration } from "openai";

dotenv.config(); // Load .env variables

const app = express();
app.use(express.json());
app.use(cors()); // Allow frontend to call backend

// Initialize OpenAI with API key from .env
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, 
});
const openai = new OpenAIApi(configuration);

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
      max_tokens: 256,
    });

    res.json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "OpenAI API request failed" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
