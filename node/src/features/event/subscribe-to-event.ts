import { eq } from "drizzle-orm";
import { db } from "../../drizzle/client";
import { subscriptions } from "../../drizzle/schema/subscriptions";
import { redis } from "../../redis/client";
import type { ISubscribeToEvent } from "../interfaces/requests";

export async function subscribeToEvent({
	name,
	email,
	referrererId,
}: ISubscribeToEvent) {
	const subscribers = await db
		.select()
		.from(subscriptions)
		.where(eq(subscriptions.email, email));

	if (subscribers.length > 0) {
		return { subscriberId: subscribers[0].id };
	}

	const result = await db
		.insert(subscriptions)
		.values({
			name,
			email,
		})
		.returning();

	if (referrererId) {
		await redis.zincrby("referral:ranking", 1, referrererId);
	}

	const subscriberId = result[0].id;

	return {
		subscriberId: subscriberId,
	};
}
