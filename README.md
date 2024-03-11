# Noteworthy

The next generation music-powered note-taking app! 

## Setup

To start the app, run the following commands:

```bash
cd web
npm install
npm run dev
```

This will run a development server at `localhost:5173`.

## Components

### Web

The web app is a SvelteKit app which uses the Pinecone and OpenAI SDK to take a user query and return a list of songs and lyrics which match the query. DaisyUI and TailwindCSS are used for styling.

### Python

The python script is an example script which uses Pinecone and OpenAI to take a list of songs and lyrics and create their embeddings.

## Implementation

This is implemented in the final project by embedding this project in an `iframe`. This project is deployed to Vercel at [noteworthy-xi.vercel.app](https://noteworthy-xi.vercel.app), which is then embedded in the parent React project.