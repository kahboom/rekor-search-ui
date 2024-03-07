// Server Action
export function getRekorEndpoint() {
	"use server";
	return process.env.NEXT_PUBLIC_REKOR_DEFAULT_DOMAIN;
}
