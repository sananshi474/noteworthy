<script lang="ts">
    import OpenAI from 'openai'

	const openai = new OpenAI({
		apiKey: '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',
		dangerouslyAllowBrowser: true
	});

	import { Pinecone } from '@pinecone-database/pinecone';
	import { onMount } from 'svelte';

	const pc = new Pinecone({
		apiKey: 'd288e59a-5285-4c3f-a02f-fc98be060536'
	});
	async function queryInput(input: string) {
		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		const raw = JSON.stringify({
			input,
		});

		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw,
		};

        let response = (await fetch('/api', requestOptions)).text()
        let jsonText = await response
        outp = jsonText;
        console.log(JSON.parse(jsonText).result)
	}

    onMount(() => {
        queryInput("Funny Stupid Fickle")
    })

    let inp: string | undefined;
    let outp: string | undefined;
</script>

<label class="input input-bordered flex items-center gap-2">
    <input bind:value={inp} type="text" class="grow" placeholder="Search" />
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4 opacity-70"><path fill-rule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clip-rule="evenodd" /></svg>
</label>

<button on:click={() => {if (inp) {queryInput(inp)}}} class="btn btn-accent">Search</button>

{#if outp}
    <h1>
        <pre>{JSON.stringify(JSON.parse(outp), null, 2)}</pre>
    </h1>
{/if}