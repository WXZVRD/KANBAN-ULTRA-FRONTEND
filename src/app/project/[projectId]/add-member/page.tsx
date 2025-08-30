import { Metadata } from 'next'





const metadata: Metadata = {
	title: 'Add Member',
	description: 'Add member page'
}

type Props = {
	params: {
		projectId: string
	}
}

export default function AddMemberPage({ params }: Props) {
	return <h1>I ADD MEMBER PAGE for ${params.projectId} project</h1>
}
