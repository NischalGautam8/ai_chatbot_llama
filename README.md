# AI Chat Application INDUCTIVE take home assignment

A React-based chat application that uses Ollama's API to interact with LLM models. The application supports multiple personas, custom agents, and includes a mock response system for testing.

## Prerequisites

1. **Ollama Installation**
   - Download and install Ollama from [https://ollama.ai/](https://ollama.ai/)
   - Follow the installation instructions for your operating system

2. **LLM Model Setup**
   - After installing Ollama, run the following command to download and set up the LLama model:
   ```bash
   ollama run llama3.2
   ```

## Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Running the Application

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Access the application**
   - Open your browser and navigate to `http://localhost:5173`

## Features

### Chat Interface
- Enter your prompt in the input field
- Press Enter or click the send button to get a response
- Responses are displayed in a conversation format

### Personas
- Choose from pre-defined personas including:
  - Default (Helpful and professional)
  - Ram (Funny and sarcastic)
  - Shyam (Computer Science expert)
  - Raj (Offensive)

### Custom Agents
1. Click the "Create New Agent" button
2. Enter:
   - Agent name
   - Description
   - System prompt
3. Your custom agent will be saved locally

### Mock Response System
To enable mock responses (useful for testing without API):
1. Open `src/config/gemini.ts`
2. Set `USE_MOCK_RESPONSES = true`
3. The application will now use predefined responses instead of calling the API

## Tech Stack
- React
- TypeScript
- Vite
- TailwindCSS
- OpenAI API (configured for Ollama)

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Screenshots
![image](https://github.com/user-attachments/assets/e1c4d730-9a86-4761-8921-2df2604870cb)
![image](https://github.com/user-attachments/assets/8ad2b50d-3228-4293-9b8f-391a90c98c2b)
![image](https://github.com/user-attachments/assets/c10e45ef-afff-4a3f-8f81-4e7ee7cb0d4c)
![image](https://github.com/user-attachments/assets/4246fd8c-9162-4318-8e2b-0047c45c3ec5)

