import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@/libs/withSession";
import db from "@/libs/db";

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
