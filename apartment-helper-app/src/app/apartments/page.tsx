'use client'

import { Apartment } from '@/generated/prisma-client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export default function Apartments() {
  const { data: session } = useSession()

  const [apartments, setApartments] = useState<Apartment[]>([])

  useEffect(() => {
    const fetchApartments = async (): Promise<void> => {
      const response = await fetch('/api/apartment', {
        method: 'GET',
      })
      const apartments = (await response.json()) as unknown as Apartment[]
      console.log('apartments', apartments)
      setApartments(apartments)
    }
    fetchApartments()
  }, [])

  if (session === null) {
    return null
  }

  return (
    <div>
      <h1>Apartments</h1>
      <ul>
        {apartments.map((apartment, index) => {
          return <li key={index}>{apartment.title}</li>
        })}
      </ul>
    </div>
  )
}
