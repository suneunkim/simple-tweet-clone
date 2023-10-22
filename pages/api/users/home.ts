import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/server/withSession";
import db from "@/libs/server/prismaClinet";

interface ResponseType {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
  } = req;
  if (!user?.id) {
    return res.status(401).end();
  }
  // 로그인한 유저 정보
  const dbUser = await db.user.findUnique({
    where: {
      id: user.id,
    },
  });
  if (!dbUser) {
    return res.status(404).end();
  }
  return res.send({ ...dbUser });
}

export default withApiSession(handler);
