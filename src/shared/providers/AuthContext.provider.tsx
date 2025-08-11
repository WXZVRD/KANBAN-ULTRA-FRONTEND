import { Context, createContext, JSX, PropsWithChildren, useState } from 'react'

import { IUser } from '@/feautures/auth/types'

interface AuthContextType {
	user: IUser | null
	setUser: (user: any) => void
}

export const AuthContext: Context<AuthContextType | undefined> = createContext<
	AuthContextType | undefined
>(undefined)

export function AuthProvider({ children }: PropsWithChildren): JSX.Element {
	const [user, setUser] = useState<IUser | null>(null)

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}
