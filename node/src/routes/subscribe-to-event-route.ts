import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { subscribeToEvent } from '../functions/subscribe-to-event'

export const subscribeToEventRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/subscriptions',
    {
      schema: {
        summary: 'Subscribes someone to the event',
        tags: ['Subscription'],
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          referrer: z.string().nullish(),
        }),
        response: {
          201: z.object({
            subscriberId: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const { name, email, referrer } = req.body

      //criação da inscrição no banco de dados
      const { subscriberId } = await subscribeToEvent({
        name,
        email,
        referrerId: referrer,
      })

      return res.status(201).send({
        subscriberId,
      })
      // 201 -> foi sucesso e um recurso foi criado!
    }
  )
}
