"use server";

// Server Action
export async function getRekorEndpoint() {
	return process.env.NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN;
}
