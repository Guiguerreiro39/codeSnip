import { redirect, type RequestEvent, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, url, cookies }: RequestEvent) => {
	const redirectURL = `${url.origin}/api/redirect`;
	const authMethods = await locals.pb?.collection('users').listAuthMethods();
	const code = url.searchParams.get('code') || '';
	const state = url.searchParams.get('state') || '';

	if (!authMethods?.authProviders) {
		console.error('No auth providers');
		throw redirect(303, '/login');
	}

	const provider = authMethods.authProviders.find((p) => p.name === cookies.get('providerName'));

	if (!provider) {
		console.error('Provider does not exist');
		throw redirect(303, '/login');
	}

	if (cookies.get('providerState') !== state) {
		console.error('State does not match');
		throw redirect(303, '/login');
	}

	if (!locals.pb) {
		console.error('Pocketbase not initialized');
		throw redirect(303, '/login');
	}

	try {
		await locals.pb
			?.collection('users')
			.authWithOAuth2(provider.name, code, provider.codeVerifier, redirectURL);
	} catch (err) {
		console.error('Error while logging with auth provider: ', err);
		throw redirect(303, '/login');
	}

	throw redirect(303, '/');
};
