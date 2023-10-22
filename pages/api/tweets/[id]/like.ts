import { withApiSession } from "@/libs/server/withSession";
import db from "@/libs/server/prismaClinet";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@/libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    session: { user },
  } = req;

  const alreadyExists = await db.like.findFirst({
    where: {
      userId: user?.id,
      id: Number(id),
    },
    select: {
      id: true,
    },
  });

  if (alreadyExists) {
    await db.like.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await db.like.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        tweet: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }

  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
