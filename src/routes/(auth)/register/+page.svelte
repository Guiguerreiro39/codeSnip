<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<div class="h-screen w-screen flex items-center justify-center">
	<form method="POST" action="?/register" use:enhance class="card bg-base-100 w-96 shadow-xl">
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
				<label class="label" for="username">Name</label>
				<input
					type="text"
					placeholder="Name"
					name="name"
					class="input input-bordered w-full focus:outline-primary"
				/>
			</div>
			<div>
				<label class="label" for="email">Email</label>
				<input
					type="email"
					placeholder="Email"
					name="email"
					class="input input-bordered  w-full focus:outline-primary"
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
			<div>
				<label class="label" for="passwordConfirm">Confirm Password</label>
				<input
					type="password"
					name="passwordConfirm"
					placeholder="Confirm Password"
					class="input input-bordered w-full focus:outline-primary"
				/>
			</div>
			<button class="btn btn-primary mt-4">Sign up</button>
		</div>
	</form>
</div>
