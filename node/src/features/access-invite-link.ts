import { redis } from "../redis/client";
import type { IAccessInviteLink } from "./interfaces/requests";

export async function accessInviteLink({ subscriberId }: IAccessInviteLink) {
	// hashes são como objetos {}
	// { '6252084e-c187-438e-841a-ec8542445a30': 1 }
	await redis.hincrby("referral:access-count", subscriberId, 1);
}
