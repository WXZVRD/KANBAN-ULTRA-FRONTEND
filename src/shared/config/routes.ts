export const APP_ROUTES = {
	ROOT: '/',

	// Auth routes
	AUTH: {
		LOGIN: '/auth/login',
		REGISTER: '/auth/register',
		RESET_PASSWORD: '/auth/reset-password',
		NEW_PASSWORD: '/auth/new-password',
		NEW_VERIFICATION: '/auth/new-verification'
	},

	// Dashboard routes
	DASHBOARD_SETTINGS: '/dashboard/settings',

	// Project routes
	PROJECTS: {
		ROOT: '/project',
		CREATE: '/project/create',

		// Dynamic project routes
		CURRENT: (projectId: string) => `/project/${projectId}`,
		ADD_MEMBER: (projectId: string) => `/project/${projectId}/add-member`,
		EDIT: (projectId: string) => `/project/${projectId}/edit`,
		MEMBERS: (projectId: string) => `/project/${projectId}/members`,
		STATISTIC: (projectId: string) => `/project/${projectId}/statistic`
	}
} as const
