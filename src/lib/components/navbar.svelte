<script lang="ts">
	import { page } from '$app/stores';
	import { enhance, type SubmitFunction } from '$app/forms';
	import cookie from 'cookiejs';

	export let name: string = '';

	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme');

		if (theme) {
			document.documentElement.setAttribute('data-theme', theme);
			cookie.set('colorTheme', theme, 60 * 60 * 24 * 365);
		}
	};
</script>

<nav class="navbar bg-base-100">
	<label for="sidebar-drawer" class="btn-ghost btn-square btn mr-8 lg:hidden">
		<iconify-icon icon="tabler:menu-2" width="30" />
	</label>
	<div class="flex-1">
		<input type="text" placeholder="Search" class="input-bordered input float-left" />
	</div>
	<div class="flex-none">
		<div class="dropdown-end dropdown">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn-ghost btn">
				<p>Theme</p>
			</label>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-200 p-2 shadow"
			>
				<form method="POST" use:enhance={submitUpdateTheme}>
					<li>
						<button formaction="/?/setTheme&theme=winter&redirectTo={$page.url.pathname}"
							>Light</button
						>
					</li>
					<li>
						<button formaction="/?/setTheme&theme=dark&redirectTo={$page.url.pathname}">Dark</button
						>
					</li>
				</form>
			</ul>
		</div>
		<div class="dropdown-end dropdown">
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label tabindex="0" class="btn-ghost btn-circle avatar btn">
				<div class="w-10 rounded-full">
					<img src="https://placeimg.com/80/80/people" alt="bla" />
				</div>
			</label>
			<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
			<ul
				tabindex="0"
				class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-200 p-2 shadow"
			>
				<li>
					<p class="justify-between">
						Profile
						<span class="badge">New</span>
					</p>
				</li>
				<li><p>Settings</p></li>
				<form action="/api/logout" method="POST">
					<li>
						<button class="w-100">Logout</button>
					</li>
				</form>
			</ul>
		</div>
		<p>{name}</p>
	</div>
</nav>
