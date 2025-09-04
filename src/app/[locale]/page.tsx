'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { Button, Card, CardContent, CardFooter } from '@/shared/components/ui'
import { APP_ROUTES } from '@/shared/consts'

import { useAuth } from '@/feautures/auth'
import { useRouter } from 'next/navigation'

export default function Home() {
	const { user } = useAuth()
	const router = useRouter()
	const t = useTranslations()

	return (
		<div className='flex h-full flex-col items-center justify-center bg-gradient-to-b px-4'>
			<motion.div
				animate={{ y: [0, -20, 0] }}
				transition={{ duration: 2, repeat: Infinity }}
				className='mb-8 text-9xl md:text-[12rem]'
			>
				😊
			</motion.div>

			<Card className='w-full max-w-3xl border border-gray-200 shadow-xl'>
				<CardContent className='px-8 py-12 text-center'>
					<h1 className='mb-6 text-4xl font-bold text-indigo-600 md:text-5xl'>
						Welcome to MyProject!
					</h1>

					<p className='mb-4 text-lg text-gray-700 md:text-xl'>
						MyProject is your ultimate tool for managing projects,
						collaborating with your team, and bringing your ideas to
						life.
					</p>

					<p className='mb-3 text-gray-600'>
						🌟 <strong>Features:</strong> Real-time collaboration,
						dynamic task boards, customizable project columns,
						member management, and detailed project statistics.
					</p>

					<p className='mb-3 text-gray-600'>
						💻 <strong>Frontend:</strong> Built with{' '}
						<em>React, Next.js, ShadCN UI, Tailwind CSS</em> and
						supports internationalization with i18n.
					</p>

					<p className='mb-3 text-gray-600'>
						⚙️ <strong>Backend:</strong> Developed on{' '}
						<em>NestJS, TypeORM, PostgreSQL, Redis</em> for fast,
						reliable, and secure project management.
					</p>

					<p className='mt-4 text-gray-600 italic'>
						We hope you enjoy organizing your workflow,
						collaborating efficiently, and making your projects
						shine! ✨
					</p>
				</CardContent>
				{!user && (
					<CardFooter className='flex justify-center gap-4 py-6'>
						<Button
							variant='default'
							onClick={() => router.push(APP_ROUTES.AUTH.LOGIN)}
						>
							{t('Auth.login')}
						</Button>
						<Button
							variant='outline'
							onClick={() =>
								router.push(APP_ROUTES.AUTH.REGISTER)
							}
						>
							{t('Auth.register')}
						</Button>
					</CardFooter>
				)}
			</Card>
		</div>
	)
}
