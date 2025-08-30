'use client'

import { useTheme } from 'next-themes'
import { PropsWithChildren } from 'react'

export function AnimatedBG({ children }: PropsWithChildren) {
	const { theme } = useTheme()
	const isLight = theme === 'light'

	console.log('theme', theme)

	return (
		<div
			className={`relative flex min-h-screen w-full items-center justify-center overflow-hidden transition-colors duration-700 ${isLight ? 'bg-white' : 'bg-black'}`}
		>
			<div
				className={`animate-float-slow absolute -top-32 -left-32 h-96 w-96 rounded-full opacity-25 blur-3xl ${isLight ? 'bg-black' : 'bg-white'}`}
			/>
			<div
				className={`animate-float absolute top-1/2 -right-32 h-[28rem] w-[28rem] rounded-full opacity-20 blur-3xl ${isLight ? 'bg-gray-700' : 'bg-gray-300'}`}
			/>
			<div
				className={`animate-float-slow absolute bottom-[-10rem] left-1/4 h-72 w-72 rounded-full opacity-20 blur-2xl ${isLight ? 'bg-gray-600' : 'bg-gray-400'}`}
			/>

			<div className='relative z-10 w-full'>{children}</div>

			<style jsx>{`
				.animate-float {
					animation: float 3s ease-in-out infinite;
				}

				.animate-float-slow {
					animation: float 5s ease-in-out infinite;
				}

				@keyframes float {
					0% {
						transform: translateY(0) translateX(0);
					}
					50% {
						transform: translateY(-90px) translateX(40px);
					}
					100% {
						transform: translateY(0) translateX(0);
					}
				}
			`}</style>
		</div>
	)
}
