import { fastifyCors } from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env";
import { subscribeToEventRoute } from "./routes/event/subscribe-to-event-route";
import { acessInviteLinkRoute } from "./routes/invite/access-invite-link-route";
import { getSubscriberInviteClicksRoute } from "./routes/invite/get-subscriber-invite-clicks-route";
import { getSubscriberInvitesCountRoute } from "./routes/invite/get-subscriber-invites-count-route";
import { getRankingRoute } from "./routes/ranking/get-ranking-route";
import { getSubscriberRankingPositionRoute } from "./routes/ranking/get-subscriber-ranking-position-route";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setSerializerCompiler(serializerCompiler);
app.setValidatorCompiler(validatorCompiler);

app.register(fastifyCors);

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "NLW Connect",
			version: "0.0.1",
		},
	},
	transform: jsonSchemaTransform,
});

app.register(subscribeToEventRoute);
app.register(acessInviteLinkRoute);
app.register(getSubscriberInviteClicksRoute);
app.register(getSubscriberInvitesCountRoute);
app.register(getSubscriberRankingPositionRoute);
app.register(getRankingRoute);

app.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

app.listen({ port: env.PORT }).then(() => {
	console.log("HTTP server running");
});
