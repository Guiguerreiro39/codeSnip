import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const records = await locals.pb?.collection('snips').getFullList(200 /* batch size */, {
		sort: '-created'
	});

	if (!records) {
		console.error('Records not found');
		return {
			error: true,
			message: 'Records not found'
		};
	}

	return {
		success: true,
		snips: [...records.map((snip) => snip.export())]
	};
};

export const actions: Actions = {
	setTheme: async ({ url, cookies }) => {
		const theme = url.searchParams.get('theme');
		const redirectTo = url.searchParams.get('redirectTo');
		if (theme) {
			cookies.set('colorTheme', theme, {
				path: '/',
				maxAge: 60 * 60 * 24 * 365
			});
		}

		if (redirectTo) throw redirect(303, redirectTo);
	}
};
