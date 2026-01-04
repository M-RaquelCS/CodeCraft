import { redis } from "../../redis/client";
import type { IGetSubscriberRankingPositionParams } from "../interfaces/requests";

export async function getSubscriberRankingPosition({
	subscriberId,
}: IGetSubscriberRankingPositionParams) {
	const rank = await redis.zrevrank("referral:ranking", subscriberId);
	if (rank === null) {
		return { position: null };
	}

	return { position: rank + 1 };
}
