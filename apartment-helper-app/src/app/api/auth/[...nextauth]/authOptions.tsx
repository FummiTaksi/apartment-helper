import { User } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

type Credentials = {
  username: string
  password: string
}

const isCorrectCredentials = (credentials: Credentials): boolean => {
  return (
    credentials.username === process.env.NEXTAUTH_USERNAME &&
    credentials.password === process.env.NEXTAUTH_PASSWORD
  )
}

export const authOptions = {
  secret: process.env.SECRET,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (
        config?: Record<string, string | undefined>,
      ): Promise<User | null> => {
        if (config?.username === undefined || config?.password === undefined) {
          throw new Error('No credentials')
        }
        const credentials: Credentials = {
          username: config.username,
          password: config.password,
        }
        if (isCorrectCredentials(credentials)) {
          const user = { id: '1', name: 'Admin' }
          return Promise.resolve(user)
        } else {
          return Promise.resolve(null)
        }
      },
    }),
  ],
}
