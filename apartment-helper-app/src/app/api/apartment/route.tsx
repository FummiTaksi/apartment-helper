import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma-client'
import { getToken } from 'next-auth/jwt'

export async function POST(req: NextRequest) {
  const token = await getToken({ req: req })

  if (!token) {
    return NextResponse.json({ error: 'unauthorized', status: 401 })
  }

  const prisma = new PrismaClient()

  const apartment = await req.json()

  await prisma.apartment.create({
    data: apartment,
  })

  return NextResponse.json(apartment)
}

export async function GET(req: NextRequest) {
  const token = await getToken({ req: req })

  if (!token) {
    return NextResponse.json({ error: 'unauthorized', status: 401 })
  }
  const prisma = new PrismaClient()

  const apartments = await prisma.apartment.findMany()
  return NextResponse.json(apartments)
}
