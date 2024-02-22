import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';

const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true
});

const pc = new Pinecone({
    apiKey: 'd288e59a-5285-4c3f-a02f-fc98be060536'
});

const index = pc.Index("prima-test", "https://prima-test-bv8irtr.svc.apw5-4e34-81fa.pinecone.io")

export const POST: RequestHandler = async ({request}) => {
    let data = await request.json()
    let input: string = data.input

    const embedding = await openai.embeddings.create({
        model: 'text-embedding-3-small',
        input,
        encoding_format: 'float'
    });

    const vector = embedding.data[0].embedding;

    const results = await index.query({
        vector,
        topK: 3
    })

    return json({
        result: results.matches
    })
};