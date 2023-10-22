import { withApiSession } from "@/libs/server/withSession";
import db from "@/libs/server/prismaClinet";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.session;
  const { id } = req.query;

  if (!user) {
    return res.status(401).json({ message: "로그인이 필요합니다." });
  }
  // 특정 트윗 찾기
  if (req.method === "GET") {
    const userTweet = await db.tweet.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        user: true,
        likes: true,
      },
    });

    return res.status(200).json({ ok: true, userTweet });
  } else {
    return res.status(405).json({ message: "허용되지 않은 요청입니다." });
  }
}

export default withApiSession(handler);
