import { MemberListTable } from '@/feautures/member/member-table/ui/MemberListTable'

interface IMemberPage {
	params: {
		projectId: string
	}
}

export default function MembersPage({ params }: IMemberPage) {
	return <MemberListTable projectId={params.projectId} />
}
