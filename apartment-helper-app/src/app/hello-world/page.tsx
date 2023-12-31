import React from 'react'
import { PrismaClient } from '@/generated/prisma-client'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/authOptions'
import Link from 'next/link'

const fetchHelloWorldContent = async (): Promise<string> => {
  const prisma = new PrismaClient()
  const helloWorld = await prisma.message.findFirst()
  if (helloWorld?.content !== undefined) {
    return helloWorld.content
  }
  return ''
}

export default async function HelloWorld() {
  const content = await fetchHelloWorldContent()
  const session = await getServerSession(authOptions)
  if (session === null) {
    return null
  }
  return (
    <div>
      <Link
        data-testid="create-new-apartment-link"
        href="/create-new-apartment"
      >
        Create new apartment
      </Link>
      <h1>{content}</h1>
    </div>
  )
}
