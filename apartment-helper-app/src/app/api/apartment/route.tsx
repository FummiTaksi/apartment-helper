import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma-client'
import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  if (process.env.SECRET === undefined) {
    throw new Error('SECRET env not set')
  }
  const sessionToken = cookies().get('next-auth.session-token')
  const decoded = await decode({
    token: sessionToken?.value,
    secret: process.env.SECRET,
  })

  if (decoded === null) {
    return NextResponse.json({ status: 401, message: 'Unauthorized' })
  }

  const prisma = new PrismaClient()

  const apartment = await req.json()

  await prisma.apartment.create({
    data: apartment,
  })

  return NextResponse.json(apartment)
}

export async function GET(req: NextRequest) {
  if (process.env.SECRET === undefined) {
    throw new Error('SECRET env not set')
  }
  const sessionToken = cookies().get('next-auth.session-token')
  const decoded = await decode({
    token: sessionToken?.value,
    secret: process.env.SECRET,
  })

  if (decoded === null) {
    return NextResponse.json({ status: 401, message: 'Unauthorized' })
  }

  const prisma = new PrismaClient()

  const apartments = await prisma.apartment.findMany()
  return NextResponse.json(apartments)
}
