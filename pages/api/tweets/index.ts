import { withApiSession } from "@/libs/server/withSession";
import db from "@/libs/server/prismaClinet";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    session: { user },
  } = req;

  if (req.method === "POST") {
    const { text } = req.body;

    if (!user) {
      return res.status(401).json({ message: "로그인이 필요합니다" });
    }

    const createdTweet = await db.tweet.create({
      data: {
        text: text as string,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    return res.status(201).json(createdTweet);
  }

  if ((req.method = "GET")) {
    const allTweet = await db.tweet.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return res.status(200).json({ ok: true, allTweet });
  }
  return res.status(405).json({ message: "허용되지 않은 요청입니다." });
}

export default withApiSession(handler);
