import { toast } from 'sonner'

import { APP_ROUTES } from '@/shared/consts/routes.constant'
import { toastMessageHandler } from '@/shared/utils'

import { createProject } from '@/entities/project/api/project.api'
import { IProject } from '@/entities/project/types/project.interface'
import { TypeCreateProjectScheme } from '@/feautures/project/create-project/schemes/CreateProject.scheme'
import { useMutation } from '@tanstack/react-query'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'

export function useCreateProject() {
	const router: AppRouterInstance = useRouter()

	const { mutate: createProjectMutation, isPending: isCreateProjectLoading } =
		useMutation({
			mutationKey: ['create-project'],
			mutationFn: async (
				body: TypeCreateProjectScheme
			): Promise<IProject> => await createProject(body),
			onSuccess(data: IProject): void {
				toast.success('Проект создан', {
					description: `Проект «${data.title}» успешно создан`
				})
				router.push(APP_ROUTES.PROJECTS.CURRENT(data.id))
			},
			onError(error: Error): void {
				toastMessageHandler(error)
			}
		})

	return { createProjectMutation, isCreateProjectLoading }
}
