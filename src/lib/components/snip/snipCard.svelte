<script lang="ts">
	import Clipboard from 'svelte-clipboard';

	export let snip: any;
	export let index: number;

	const handleSuccessfullyCopied = () => {
		alert(`successfully copied to clipboard!`);
	};

	const handleFailedCopy = () => {
		alert('failed to copy :(');
	};
</script>

<label
	for={`snip-modal-${snip.id}`}
	class="card h-72 w-96 max-w-2xl grow cursor-pointer overflow-hidden bg-base-200 shadow-xl"
>
	<img
		class="h-28 w-full object-cover"
		src={`https://source.unsplash.com/random?sig=${index}`}
		alt={snip.title}
	/>
	<div class="card-body">
		<h2 class="card-title">{snip.title}</h2>
		<p class="opacity-75">{snip.description}</p>
	</div>
</label>

<input type="checkbox" id={`snip-modal-${snip.id}`} class="modal-toggle" />
<label for={`snip-modal-${snip.id}`} class="modal cursor-pointer">
	<label class="modal-box relative w-11/12 max-w-5xl" for="">
		<h3 class="text-lg font-bold">{snip.title}</h3>
		<p class="py-4">
			{snip.description}
		</p>
		<div class="mockup-code bg-primary p-6 text-primary-content">
			<Clipboard
				text={snip.code}
				let:copy
				on:copy={handleSuccessfullyCopied}
				on:fail={handleFailedCopy}
			>
				<button on:click={copy} class="btn-ghost btn absolute top-6 right-6">
					<iconify-icon icon="material-symbols:content-copy-outline" width="30" />
				</button>
			</Clipboard>
			<pre><code>{snip.code}</code></pre>
		</div>
	</label>
</label>
