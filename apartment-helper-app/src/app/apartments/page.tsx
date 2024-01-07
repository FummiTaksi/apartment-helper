'use client'

import { Apartment } from '@/generated/prisma-client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Apartments() {
  const { data: session } = useSession()

  const [apartments, setApartments] = useState<Apartment[]>([])

  useEffect(() => {
    const fetchApartments = async (): Promise<void> => {
      const response = await fetch('/api/apartment', {
        method: 'GET',
      })
      const apartments = (await response.json()) as unknown as Apartment[]
      setApartments(apartments)
    }
    fetchApartments()
  }, [])

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
      <h1>Apartments</h1>
      <ul>
        {apartments.map((apartment, index) => {
          return (
            <li key={index} data-testid={`apartment-${index}`}>
              {apartment.title}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
