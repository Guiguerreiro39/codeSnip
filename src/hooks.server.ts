import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import PocketBase from 'pocketbase';

const pocketBaseHandler: Handle = async ({ event, resolve }) => {
	event.locals.pb = new PocketBase('http://127.0.0.1:8090');
	event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

	if (event.locals.pb.authStore.isValid) {
		event.locals.user = event.locals.pb.authStore.model;
	}

	const response: Response = await resolve(event);

	// TODO: secure before deployment
	response.headers.append(
		'set-cookie',
		event.locals.pb.authStore.exportToCookie({ sameSite: 'Lax', secure: false })
	);

	return response;
};

const protectedRoutesHandler: Handle = async ({ event, resolve }) => {
	if (event.route.id?.startsWith('/(app)') && !event.locals.pb?.authStore.isValid) {
		throw redirect(303, '/login');
	}

	if (event.route.id?.startsWith('/(auth)') && event.locals.pb?.authStore.isValid) {
		throw redirect(303, '/');
	}

	return await resolve(event);
};

const colorThemeHandler: Handle = async ({ event, resolve }) => {
	let theme: string | null = null;

	const newTheme = event.url.searchParams.get('theme');
	const cookieTheme = event.cookies.get('colorTheme');

	if (newTheme) theme = newTheme;
	if (cookieTheme) theme ||= cookieTheme;

	if (theme) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => html.replace('data-theme="winter"', `data-theme="${theme}"`)
		});
	}

	return await resolve(event);
};

export const handle: Handle = sequence(
	pocketBaseHandler,
	protectedRoutesHandler,
	colorThemeHandler
);
