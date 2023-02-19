<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="flex flex-col items-center justify-center gap-10">
	<h2 class="text-2xl">Create a snip</h2>
	<form method="POST" action="?/create" use:enhance class="card bg-base-200 w-96 shadow-xl">
		<div class="card-body flex flex-col gap-4">
			<div>
				<label class="label" for="username">Title</label>
				<input
					type="text"
					placeholder="Title"
					name="title"
					class="input input-bordered w-full focus:outline-primary"
				/>
			</div>
			<div>
				<label class="label" for="username">Description</label>
				<textarea
					placeholder="Description"
					name="description"
					rows="3"
					class="textarea textarea-bordered w-full focus:outline-primary"
				/>
			</div>
			<div>
				<label class="label" for="username">Snip</label>
				<textarea
					placeholder="Snip"
					name="code"
					rows="6"
					class="textarea textarea-bordered w-full focus:outline-primary"
				/>
			</div>
			<button class="btn btn-primary mt-4">Create</button>
		</div>
	</form>
</div>
