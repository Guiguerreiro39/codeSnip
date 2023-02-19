<script lang="ts">
	import type { PageData } from './$types';
	import Sidebar from '@/lib/components/sidebar.svelte';
	import Navbar from '@/lib/components/navbar.svelte';

	export let data: PageData;
</script>

<div class="drawer">
	<input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex">
		<div class="hidden w-72 shrink-0 bg-base-200 lg:block">
			<Sidebar />
		</div>
		<div class="grow">
			<Navbar name={data.user?.name} />
			<div class="m-12">
				<slot />
			</div>
		</div>
	</div>
	<div class="drawer-side">
		<label for="sidebar-drawer" class="drawer-overlay" />
		<div class="w-72 bg-base-200">
			<Sidebar />
		</div>
	</div>
</div>
