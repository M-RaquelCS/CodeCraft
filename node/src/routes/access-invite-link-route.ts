import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { env } from "../env";
import { accessInviteLink } from "../features/access-invite-link";
import { redis } from "../redis/client";

export const acessInviteLinkRoute: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/invites/:subscriberId",
		{
			schema: {
				summary: "Access invite link and redirects user",
				tags: ["referral"],
				params: z.object({
					subscriberId: z.string(),
				}),
				response: {
					201: z.object({
						subscriberId: z.string(),
					}),
				},
			},
		},

		async (request, reply) => {
			const { subscriberId } = request.params;
			await accessInviteLink({ subscriberId });

			// console.log(await redis.hgetall("referral:access-count")); - verificação se deu certo

			const redirectUrl = new URL(env.WEB_URL);

			redirectUrl.searchParams.set("referrer", subscriberId);

			// 301: redirect permanente
			// 302: redirect temporário

			return reply.redirect(redirectUrl.toString(), 302);
		},
	);
};
