import { withApiSession } from "@/libs/withSession";
import db from "@/libs/db";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email } = req.body;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).end();
    }
    req.session.user = {
      id: +user.id,
    };
    await req.session.save();
    return res.status(200).end();
  }
  return res.status(405).end();
}

export default withApiSession(handler);
//404 유저 없음
//유저 db에서 확인되면 세션에 저장
