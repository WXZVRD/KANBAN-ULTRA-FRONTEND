import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeCreateProjectScheme } from '@/feautures/project/schemes/CreateProject.scheme'
import { projectService } from '@/feautures/project/service/project.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useCreateproject() {
	const router = useRouter()

	const { mutate: createProject, isPending: isCreateProjectLoading } =
		useMutation({
			mutationKey: ['create-project'],
			mutationFn: async (body: TypeCreateProjectScheme) =>
				await projectService.create(body),
			onSuccess(data) {
				toast.success('Проект создан', {
					description: `Проект «${data.title}» успешно создан`
				})
				router.push(`/project/${data.id}`)
			},
			onError(error) {
				toastMessageHandler(error)
			}
		})

	return { createProject, isCreateProjectLoading }
}
