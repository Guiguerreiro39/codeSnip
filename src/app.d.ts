import PocketBase, { Record, Admin } from 'pocketbase';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb?: PocketBase;
			user?: Record | Admin | null;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
