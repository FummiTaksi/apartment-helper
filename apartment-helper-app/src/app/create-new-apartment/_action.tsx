'use server'

import { PrismaClient } from '@/generated/prisma-client'
import { Apartment } from '@/generated/prisma-client'
import { FormApartment } from './page'

export const createApartment = async (
  apartment: FormApartment,
): Promise<Apartment> => {
  const prisma = new PrismaClient()
  return prisma.apartment.create({
    data: apartment,
  })
}
