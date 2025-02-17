import { getServerSession } from "next-auth";
import { authOption } from "../api/auth/[...nextauth]/route";

export const authSession = async (req, res) => {
  const session = await getServerSession(req, res, authOption);
  return session?.user;
};
