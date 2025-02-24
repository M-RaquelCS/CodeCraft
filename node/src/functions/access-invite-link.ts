import { db } from '../drizzle/client'
import { redis } from '../redis/client'

interface AccessInviteLinkParams {
  subscriberId: string
}

// create user on bd
export async function accessInviteLink({
  subscriberId,
}: AccessInviteLinkParams) {
  await redis.hincrby('referral:access-count', subscriberId, 1)
}
