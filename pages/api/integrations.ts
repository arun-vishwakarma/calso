import type { NextApiRequest, NextApiResponse } from "next";

import { getSession } from "@lib/auth";
import prisma from "@lib/prisma";

const client_id = process.env.ZOOM_CLIENT_ID;
const client_secret = process.env.ZOOM_CLIENT_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!["GET", "DELETE"].includes(req.method!)) {
    return res.status(405).end();
  }

  // Check that user is authenticated
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "You must be logged in to do this" });
    return;
  }

  if (req.method === "GET") {
    const credentials = await prisma.credential.findMany({
      where: {
        userId: session.user?.id,
      },
      select: {
        type: true,
      },
    });

    res.status(200).json(credentials);
  }

  if (req.method == "DELETE") {
    //remove zoom video from zoom account
    const credentials = await prisma.credential.findFirst({
      where: {
        userId: session.user?.id,
        type: "zoom_video",
      },
      select: {
        type: true,
        key: true,
      },
    });
    const authHeader = "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64");
    //console.log('authHeader',authHeader);
    const result = await fetch("https://zoom.us/oauth/revoke", {
      method: "POST",
      headers: {
        Authorization: authHeader,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "token=" + credentials.key.access_token,
    });
    const responseBody = await result.json();
    console.log("revoke zoom_video", responseBody);

    //remove zoom video from db
    const id = req.body.id;

    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        credentials: {
          delete: {
            id,
          },
        },
      },
    });

    res.status(200).json({ message: "Integration deleted successfully" });
  }
}
