"use server";
import HomePageClient from "@/app/(home)/page.client";
import { getRekorEndpoint } from "@/app/actions";

export default async function HomePage() {
	const newEndpoint = await getRekorEndpoint();
	return <HomePageClient rekorEndpoint={newEndpoint} />;
}
