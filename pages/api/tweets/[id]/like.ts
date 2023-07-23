import db from "@/libs/db";
import { withApiSession } from "@/libs/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { tweetId } = req.query;
  if (tweetId) {
    const tweet = await db.tweet.findUnique({
      where: {
        id: +tweetId,
      },
    });

    if (!tweet) {
      return res.status(404).json({ message: "트윗을 찾을 수 없습니다." });
    }

    return res.status(200).json({ message: "좋아요 처리가 완료되었습니다." });
  }
}

export default withApiSession(handler);
