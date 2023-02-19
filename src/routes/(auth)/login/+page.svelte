<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import cookie from 'cookiejs';

	export let data: PageData;

	const goToProvider = (provider: { name: string; state: string; redirect: string }) => {
		cookie.set('providerName', provider.name);
		cookie.set('providerState', provider.state);
		window.location.href = provider.redirect;
	};
</script>

<div class="h-screen w-screen flex items-center justify-center">
	<form method="POST" use:enhance class="card bg-base-100 w-96 shadow-xl">
		<div class="card-body flex flex-col gap-4">
			<div>
				<label class="label" for="username">Username</label>
				<input
					type="text"
					placeholder="Username"
					name="username"
					class="input input-bordered w-full focus:outline-primary"
				/>
			</div>
			<div>
				<label class="label" for="password">Password</label>
				<input
					type="password"
					placeholder="Password"
					name="password"
					class="input input-bordered  w-full focus:outline-primary"
				/>
			</div>
			<button formaction="?/login" class="btn btn-primary mt-4">Login</button>
			{#if data.providers}
				{#each data.providers as provider}
					<button
						type="button"
						on:click={() => goToProvider(provider)}
						class="btn btn-secondary capitalize mt-4">{provider.name}</button
					>
				{/each}
			{/if}
		</div>
	</form>
</div>
