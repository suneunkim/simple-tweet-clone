import { withApiSession } from "@/libs/server/withSession";
import db from "@/libs/server/prismaClinet";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  return res.status(200).json({ message: "로그아웃되었습니다." });
}
export default withApiSession(handler);
