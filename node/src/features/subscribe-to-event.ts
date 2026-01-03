import { db } from "../drizzle/client";
import { subscriptions } from "../drizzle/schema/subscriptions";
import type { ISubscribeToEvent } from "./interfaces/event";

export async function subscribeToEvent({ name, email }: ISubscribeToEvent) {
	const result = await db
		.insert(subscriptions)
		.values({
			name,
			email,
		})
		.returning();

	const subscriberId = result[0].id;

	return {
		subscriberId: subscriberId,
	};
}
