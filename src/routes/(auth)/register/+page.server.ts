import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const formData = await request.formData();
		const data = Object.fromEntries([...formData]);

		try {
			await locals.pb?.collection('users').create(data);
		} catch (err) {
			console.error('Error:', err);
			return {
				error: true,
				message: err
			};
		}

		throw redirect(303, '/login');
	}
};
