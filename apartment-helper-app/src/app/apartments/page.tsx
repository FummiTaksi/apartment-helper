'use client'

import { Apartment } from '@/generated/prisma-client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

export default function Apartments() {
  const { data: session } = useSession()

  const [apartments, setApartments] = useState<Apartment[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const fetchApartments = async (): Promise<void> => {
      const response = await fetch('/api/apartment', {
        method: 'GET',
      })
      if (response.status !== 200) {
        setErrorMessage(
          `Something went wrong when fetching apartments, status code ${response.status}`,
        )
      } else {
        const apartments = (await response.json()) as unknown as Apartment[]
        setApartments(apartments)
        setErrorMessage(null)
      }
    }
    try {
      fetchApartments()
    } catch (e) {
      setErrorMessage(`Something went wrong when fetching apartments, ${e}`)
    }
  }, [])

  if (session === null) {
    return null
  }
  if (errorMessage !== null) {
    return <p>{errorMessage}</p>
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
