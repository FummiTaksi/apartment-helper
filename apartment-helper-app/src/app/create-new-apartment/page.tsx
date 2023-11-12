'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Apartment } from '@/generated/prisma-client'
import { createApartment } from './_action'
import { useSession } from 'next-auth/react'

export type FormApartment = Omit<Apartment, 'id'> & { description: string }

export default function HelloWorld() {
  const { data: session } = useSession()

  const [apartment, setApartment] = useState<FormApartment>({
    url: '',
    title: '',
    description: '',
  })

  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [validationErrors, setValidationErrors] = useState<string[]>([])

  if (session === null) {
    return null
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setApartment({
      ...apartment,
      [name]: value,
    })
  }

  const getValidationErrors = (): string[] => {
    const newValidationErrors = []

    if (!apartment.title.trim()) {
      newValidationErrors.push('Title is missing')
    }
    if (!apartment.url.trim()) {
      newValidationErrors.push('Url is missing')
    }

    return newValidationErrors
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      const newValidationErrors = getValidationErrors()

      setValidationErrors(newValidationErrors)

      const apartmentIsValid = newValidationErrors.length === 0
      if (apartmentIsValid) {
        const createdApartment = await createApartment({
          ...apartment,
          description:
            apartment.description.length === 0 ? '' : apartment.description,
        })

        if (createdApartment) {
          setSuccessMessage('Apartment created successfully')
        }
      }
    } catch (error) {
      setErrorMessage('Something went wrong when creating apartment.')
    }
  }

  return (
    <div>
      <h1>Create new apartment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            name="url"
            data-testid="apartment-url"
            value={apartment.url}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            data-testid="apartment-title"
            value={apartment.title}
            onChange={handleInputChange}
          />
          <div className="error-list">
            <ul>
              {validationErrors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            data-testid="apartment-description"
            value={apartment.description}
            onChange={handleInputChange}
          />
        </div>
        <button data-testid="submit-apartment" type="submit">
          Add Apartment
        </button>
      </form>

      {successMessage && (
        <b data-testid={'create-apartment-success'}>{successMessage}</b>
      )}
      {errorMessage && <b>{errorMessage}</b>}
    </div>
  )
}
