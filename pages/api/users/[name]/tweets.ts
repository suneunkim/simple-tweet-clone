import { withApiSession } from "@/libs/server/withSession";
import db from "@/libs/server/prismaClinet";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { name } = req.query;

  if (!user) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }

  if (req.method === "GET") {
    const userTweets = await db.tweet.findMany({
      where: {
        user: {
          name: name?.toString(),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });

    return res.status(200).json({ ok: true, userTweets });
  } else {
    return res.status(405).json({ message: "허용되지 않은 요청입니다." });
  }
}

export default withApiSession(handler);
