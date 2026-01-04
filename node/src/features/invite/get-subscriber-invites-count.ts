import { redis } from "../../redis/client";
import type { IGetSubscriberInvitesCountParams } from "../interfaces/requests";

export async function getSubscriberInvitesCount({
	subscriberId,
}: IGetSubscriberInvitesCountParams) {
	const count = await redis.zscore("referral:ranking", subscriberId);
	// biome-ignore lint/correctness/useParseIntRadix: <explanation>
	return { count: count ? Number.parseInt(count) : 0 };
}
