# CopyAI

![CopyAI Desktop Preview](./frontend/public/images/Copy%20AI%20-screenshot-1.png)

## Description
**CopyAI** is a high-performance marketing copywriting tool designed with a 2026 high-tech aesthetic. It empowers users to generate high-converting social media captions, LinkedIn headlines, and product descriptions in seconds. Featuring a modern dark mode interface with moving aurora gradients and precision-engineered AI refinements.

## Key Features
* **Modern High-Tech Design**: A sleek, dark-themed interface with animated aurora backgrounds.
* **Smart Refinements**: Instantly transform generated text with one-tap actions:
    * **Shorten**: Condense your copy for brevity.
    * **No Emojis/Hashtags**: Clean up text for professional use.
    * **Tone Shift**: Shift between professional, happy, and punchy tones on the fly.
    * **Special Character Removal**: Pure text for easy copy-pasting.
* **Searchable Tone Selection**: Accessible and efficient tone selection via a searchable Autocomplete input.
* **AI-Powered Precision**: Leverages advanced models (DeepSeek-V3) via Hugging Face Router for high-quality, industry-specific copy.
* **Responsive Layout**: Optimized for both desktop and mobile, ensuring the UI is accessible and usable anywhere.

## Technologies Used
* **Frontend**: React, Material-UI (MUI), Emotion, Axios
* **Backend**: Express.js, Node.js, Morgan (Logging)
* **AI Engine**: DeepSeek-V3 via Hugging Face Router
* **Styling**: Vanilla CSS (Aurora animations), MUI Theme System

## Getting Started

### Prerequisites
* Node.js and npm installed.
* A Hugging Face API Key.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/markohanesian/ai-copy-mso.git
   ```
2. Install dependencies for both root and frontend:
   ```bash
   npm install && cd frontend && npm install && cd ..
   ```
3. Create a `.env` file in the root directory and add your API key:
   ```env
   HF_API_KEY=your_hugging_face_api_key
   HF_MODEL=deepseek-ai/DeepSeek-V3
   ```
4. Start the development server (runs both backend and frontend):
   ```bash
   npm start
   ```

## Author
* **Mark Ohanesian** - [GitHub](https://github.com/markohanesian)

## License
Licensed under the ISC License.
