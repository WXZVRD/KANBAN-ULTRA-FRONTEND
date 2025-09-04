import { MemberListTable } from '@/feautures/member'

interface IMemberPage {
	params: {
		projectId: string
	}
}

export default function MembersPage({ params }: IMemberPage) {
	return <MemberListTable projectId={params.projectId} />
}
