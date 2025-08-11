import { Context, createContext, ReactNode, useState } from 'react'

import { IUser } from '@/feautures/auth/types'

interface AuthContextType {
	user: IUser | null
	setUser: (user: any) => void
}

export const AuthContext: Context<AuthContextType | undefined> = createContext<
	AuthContextType | undefined
>(undefined)

export default function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<IUser | null>(null)

	return (
		<AuthContext.Provider value={{ user, setUser }}>
			{children}
		</AuthContext.Provider>
	)
}
