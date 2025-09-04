import { AuthMehods } from '@/entities/auth/types/auth-methods.enum'

export const API_ENDPOINTS = {
	// AUTH ENDPOINTS
	AUTH: {
		REGISTER: '/auth/register',
		LOGIN: '/auth/login',
		LOGOUT: '/auth/logout',

		EMAIL_CONFIRM: '/auth/email-confirmation',

		OAUTH_BY_PROVIDER: (provider: AuthMehods): string =>
			`auth/oauth/connect/${provider.toLowerCase()}`,

		PASSWORD_RECOVER: {
			RESET: '/auth/password-recovery/reset',
			NEW: (token: string | null): string =>
				`auth/password-recovery/new/${token}`
		}
	},

	// PROJECT ENDPOINTS

	PROJECT: {
		DELETE: (projectId: string): string => `/project/${projectId}`,
		CREATE: '/project/create',
		EDIT: (projectId: string): string => `/project/${projectId}`,
		ALL_BY_USER_ID: '/project/getByUser',
		ONE_BY_PROJECT_ID: (projectId: string): string =>
			`/project/${projectId}`,

		// PROJECT STATISTIC ENDPOINTS
		STATS: {
			GET_FULL: (projectId: string): string =>
				`/project/${projectId}/statistic`
		},

		// PROJECT COLUMNS ENDPOINTS
		COLUMN: {
			CREATE: 'project_column/newOne',
			RENAME: (columnId: string): string =>
				`project_column/rename/${columnId}`,
			DELETE: (projectId: string): string =>
				`project_column/${projectId}`,
			GET_BY_RPOJECT_ID: (projectId: string): string =>
				`project_column/${projectId}`,
			MOVE: (columnId: string): string =>
				`/project_column/move/${columnId}`
		},

		// PROJECT TASKS ENDPOINTS
		TASK: {
			CREATE: (projectId: string): string =>
				`/project/${projectId}/task/create`,
			UPDATE: (projectId: string): string =>
				`/project/${projectId}/task/update`,
			DELETE: (projectId: string, taskId: string): string =>
				`/project/${projectId}/task/${taskId}`
		},

		// PROJECT MEMBERSHIP ENDPOINTS
		MEMBERSHIP: {
			BY_PROJECT_ID: (projectId: string): string =>
				`/project/${projectId}/membership/project-member`,
			TAKE_INVITE: (projectId: string): string =>
				`/project/${projectId}/membership/take-invite`,
			INVITE: (projectId: string): string =>
				`/project/${projectId}/membership/invite`,
			BY_MEMBER: (projectId: string): string =>
				`/project/${projectId}/membership/get-project-by-member`,
			CHANGE_ROLE: (projectId: string): string =>
				`/project/${projectId}/membership/update-member`,
			DELETE_ALL: (projectId: string): string =>
				`/project/${projectId}/membership/members/all`
		}
	},

	// USER ENDPOINTS
	USER: {
		FIND_PROFILE: '/users/profile',
		UPDATE_PROFILE: '/users/profile'
	}
} as const
