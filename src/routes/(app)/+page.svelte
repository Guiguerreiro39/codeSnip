<script lang="ts">
	import SnipCard from '@/lib/components/snip/snipCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-wrap justify-center gap-6">
	{#if data.success}
		{#each data.snips as snip, index}
			<SnipCard {snip} {index} />
		{/each}
	{/if}
</div>
