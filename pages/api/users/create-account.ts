import db from "@/libs/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email } = req.body;
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      return res.status(200).end();
    }
    await db.user.create({
      data: {
        name,
        email,
      },
    });
    return res.status(201).end();
  }
  return res.status(405).end();
}

// 200 이미 만들어짐
// 201 만들기 완료
// 405 요청이 잘못됨
