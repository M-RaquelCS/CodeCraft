import { redis } from "../../redis/client";
import type { IGetSubscriberInviteClicksParams } from "../interfaces/requests";

export async function getSubscriberInviteClicks({
	subscriberId,
}: IGetSubscriberInviteClicksParams) {
	const count = await redis.hget("referral:access-count", subscriberId);
	// biome-ignore lint/correctness/useParseIntRadix: <explanation>
	return { count: count ? Number.parseInt(count) : 0 };
}
