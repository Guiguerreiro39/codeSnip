import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals, url }) => {
	const authMethods = await locals.pb?.collection('users').listAuthMethods();

	if (!authMethods) return {};

	const redirectURL = `${url.origin}/api/redirect`;
	const providers = authMethods.authProviders.map((p) => {
		return {
			name: p.name,
			state: p.state,
			redirect: `${p.authUrl}${redirectURL}`
		};
	});

	return {
		providers
	};
};

export const actions: Actions = {
	login: async ({ request, locals }) => {
		const formData = await request.formData();

		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		try {
			await locals.pb?.collection('users').authWithPassword(username, password);
		} catch (err) {
			console.error(err);
			return {
				error: true,
				message: err
			};
		}

		throw redirect(303, '/');
	}
};
