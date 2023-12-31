import { NextResponse } from 'next/server'
import { PrismaClient } from '@/generated/prisma-client'

export async function POST(request: Request) {
  const prisma = new PrismaClient()

  const apartment = await request.json()

  await prisma.apartment.create({
    data: apartment,
  })

  return NextResponse.json(apartment)
}
