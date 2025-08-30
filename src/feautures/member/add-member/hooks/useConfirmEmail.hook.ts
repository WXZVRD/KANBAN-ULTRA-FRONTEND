'use client'

import { useEffect } from 'react'

import { MemberRole } from '@/feautures/auth/types'
import { useConfirmInviteMutation } from '@/feautures/member/add-member/model/useConfirmInvite.mutation'
import { useParams, useSearchParams } from 'next/navigation'

export function useConfirmEmail() {
	const searchParams = useSearchParams()
	const { projectId } = useParams<{ projectId: string }>()
	const { confirmInvitation } = useConfirmInviteMutation(projectId)

	useEffect(() => {
		console.log('✅ useConfirmEmail hook triggered')

		// Логируем все параметры из searchParams
		console.log('🔍 Raw searchParams:', searchParams.toString())

		const token = searchParams.get('token')
		const role = searchParams.get('role') as MemberRole | null

		console.log('📌 projectId from params:', projectId)
		console.log('📌 token from searchParams:', token)
		console.log('📌 role from searchParams:', role)

		if (token && role && projectId) {
			console.log('🚀 Sending confirmInvitation mutation with:', {
				memberRole: role,
				projectId,
				token
			})

			confirmInvitation({
				memberRole: role,
				projectId,
				token
			})
		} else {
			console.log('⏸ Skipped confirmInvitation — missing data', {
				hasToken: !!token,
				hasRole: !!role,
				hasProjectId: !!projectId
			})
		}
	}, [searchParams, projectId])
}
