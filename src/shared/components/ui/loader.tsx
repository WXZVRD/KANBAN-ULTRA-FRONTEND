import { LuLoader } from 'react-icons/lu'

export function Loader() {
	return (
		<div className='item-center flex justify-center text-sm'>
			<LuLoader className='mr-2 size-5 animate-spin' />
			Загрузка...
		</div>
	)
}
