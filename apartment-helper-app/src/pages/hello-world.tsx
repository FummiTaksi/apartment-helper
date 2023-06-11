import { PrismaClient } from "@/generated/prisma-client";
import { GetStaticProps, InferGetStaticPropsType } from "next";

type HelloWorldProps = {
  content: string;
};
export const getStaticProps: GetStaticProps<HelloWorldProps> = async () => {
  const prisma = new PrismaClient();
  const helloWorld = await prisma.message.findFirst();
  if (helloWorld?.content !== undefined) {
    return {
      props: {
        content: helloWorld.content,
      },
    };
  }
  return {
    props: {
      content: "",
    },
  };
};

export default function HelloWorld({
  content,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <h1>{content}</h1>;
}
