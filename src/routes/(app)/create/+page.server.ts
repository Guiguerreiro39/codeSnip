import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	create: async ({ locals, request }) => {
		const formData = await request.formData();

		if (!locals.user || !locals.pb?.authStore.isValid) {
			console.error('User not found');
			locals.pb?.authStore.clear();
			throw redirect(303, '/login');
		}

		formData.set('author', locals.user.id);

		const record = await locals.pb?.collection('snips').create(formData);

		return {
			success: true,
			snip: record.export()
		};
	}
};
