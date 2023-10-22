import { withApiSession } from "@/libs/server/withSession";
import db from "@/libs/server/prismaClinet";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@/libs/server/withHandler";

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
