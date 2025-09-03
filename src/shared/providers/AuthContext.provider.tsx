'use client'

import { Context, createContext, JSX, PropsWithChildren } from 'react'

import { useProfile } from '@/shared/hooks'

import { IUser } from '@/entities/user/types/user.interface'

interface AuthContextType {
	user: IUser | null
	isLoading: boolean
}

export const AuthContext: Context<AuthContextType | undefined> = createContext<
	AuthContextType | undefined
>(undefined)

export function AuthProvider({ children }: PropsWithChildren): JSX.Element {
	const { user, isLoading } = useProfile()

	return (
		<AuthContext.Provider value={{ user, isLoading }}>
			{children}
		</AuthContext.Provider>
	)
}
