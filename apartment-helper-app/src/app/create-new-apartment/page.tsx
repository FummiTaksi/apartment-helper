'use client'

import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Apartment } from '@/generated/prisma-client'
import axios from 'axios'

type FormApartment = Omit<Apartment, 'id'> & { description: string }

export default function HelloWorld() {
  const [apartment, setApartment] = useState<FormApartment>({
    url: '',
    title: '',
    description: '',
  })

  const [validationErrors, setValidationErrors] = useState<string[]>([])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setApartment({
      ...apartment,
      [name]: value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!apartment.title.trim()) {
      setValidationErrors([...validationErrors, 'Title is missing!'])
    }
    if (!apartment.title.trim()) {
      setValidationErrors([...validationErrors, 'Url is missing!'])
    }

    const apartmentIsValid = validationErrors.length === 0
    if (apartmentIsValid) {
      const response = await axios.post('/api/apartment', {
        ...apartment,
        description:
          apartment.description.length === 0 ? null : apartment.description,
      })
      console.log('response', response)
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
            value={apartment.description}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Apartment</button>
      </form>
    </div>
  )
}
