import { toast } from 'sonner'

import { APP_ROUTES } from '@/shared/consts/routes.constant'
import { toastMessageHandler } from '@/shared/utils'

import { editProject } from '@/entities/project/api/project.api'
import { IProject } from '@/entities/project/types/project.interface'
import { TypeEditProjectScheme } from '@/feautures/project/edit-project/schemes/EditProject.scheme'
import { useMutation } from '@tanstack/react-query'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'

export function useUpdateProject() {
	const router: AppRouterInstance = useRouter()

	const { mutate: editProjectMutation, isPending: isEditProjectLoading } =
		useMutation({
			mutationKey: ['edit-project'],
			mutationFn: async ({
				projectId,
				body
			}: {
				projectId: string
				body: TypeEditProjectScheme
			}): Promise<IProject> => await editProject(projectId, body),
			onSuccess(data: IProject): void {
				toast.success('Проект обновлён', {
					description: `Проект «${data.title}» успешно обновлён`
				})
				router.push(APP_ROUTES.PROJECTS.CURRENT(data.id))
			},
			onError(error: Error): void {
				toastMessageHandler(error)
			}
		})

	return { editProjectMutation, isEditProjectLoading }
}
