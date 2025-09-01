import { toast } from 'sonner'

import { APP_ROUTES } from '@/shared/config/routes'
import { toastMessageHandler } from '@/shared/utils'

import { TypeEditProjectScheme } from '@/feautures/project/schemes/EditProject.scheme'
import { projectService } from '@/feautures/project/service/project.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export function useUpdateProject() {
	const router = useRouter()

	const { mutate: editProject, isPending: isEditProjectLoading } =
		useMutation({
			mutationKey: ['edit-project'],
			mutationFn: async ({
				projectId,
				body
			}: {
				projectId: string
				body: TypeEditProjectScheme
			}) => await projectService.edit(projectId, body),
			onSuccess(data) {
				toast.success('Проект обновлён', {
					description: `Проект «${data.title}» успешно обновлён`
				})
				router.push(APP_ROUTES.PROJECTS.CURRENT(data.id))
			},
			onError(error) {
				toastMessageHandler(error)
			}
		})

	return { editProject, isEditProjectLoading }
}
