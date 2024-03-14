<script lang="ts">

	let buttonState: boolean = false;

	import { onMount } from 'svelte';

	async function queryInput(input: string) {
		buttonState = true;
		const myHeaders = new Headers();
		myHeaders.append('Content-Type', 'application/json');

		const raw = JSON.stringify({
			input
		});

		const requestOptions = {
			method: 'POST',
			headers: myHeaders,
			body: raw
		};

		let response = (await fetch('/api', requestOptions)).text();
		let jsonText = await response;
		outp = jsonText;
		buttonState = false;
		console.log(JSON.parse(jsonText).result);
	}

	onMount(() => {
		// queryInput('Some input');
	});

	let inp: string | undefined;
	let outp: string | undefined;
</script>

<section class="p-10">
	<div class="join">
		<label class="join-item input input-bordered mb-5 flex items-center gap-2">
			<input bind:value={inp} type="text" class="grow" placeholder="Search" />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="h-4 w-4 opacity-70"
				><path
					fill-rule="evenodd"
					d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
					clip-rule="evenodd"
				/></svg
			>
		</label>

		<button
			on:click={() => {
				if (inp) {
					queryInput(inp);
				}
			}}
			class="join-item btn btn-accent"
			disabled={buttonState}>Search</button
		>
	</div>
	{#if outp}
		<p class="text-md font-bold">Here are your results!</p>
		<div class="overflow-x-auto">
			<table class="table">
				<!-- head -->

				<thead>
					<tr>
						<th></th>
						<th>Song</th>
						<th>Confidence</th>
					</tr>
				</thead>

				<tbody>
					<!-- row 1 -->
					{#each JSON.parse(outp).result as item, i}
						<tr>
							<th>{i + 1}</th>
							<td>{item.id}</td>
							<td><progress class="progress w-56" value="{item.score}" max="0.3"></progress></td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</section>
