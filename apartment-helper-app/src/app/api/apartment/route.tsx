import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma-client'
import { decode } from 'next-auth/jwt'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  const sessionToken = cookies().get('next-auth.session-token')

  if (sessionToken === undefined) {
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
  const sessionToken = cookies().get('next-auth.session-token')
  if (sessionToken === undefined) {
    return NextResponse.json({ status: 401, message: 'Unauthorized' })
  }

  const prisma = new PrismaClient()

  const apartments = await prisma.apartment.findMany()
  return NextResponse.json(apartments)
}
