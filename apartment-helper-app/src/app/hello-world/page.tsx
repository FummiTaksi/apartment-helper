import { PrismaClient } from "@/generated/prisma-client";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/route";

const fetchHelloWorldContent = async (): Promise<string> => {
  const prisma = new PrismaClient();
  const helloWorld = await prisma.message.findFirst();
  if (helloWorld?.content !== undefined) {
    return helloWorld.content;
  }
  return "";
};

export default async function HelloWorld() {
  const content = await fetchHelloWorldContent();
  const session = await getServerSession(options);
  if (session === null) {
    return null;
  }
  return <h1>{content}</h1>;
}
