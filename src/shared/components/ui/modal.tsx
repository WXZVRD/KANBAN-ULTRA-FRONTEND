import { Dialog, DialogContent } from '@/shared/components/ui/dialog'





export const BaseModal = ({
							  isOpen,
							  onClose,
							  children,
						  }: {
	isOpen: boolean;
	onClose: () => void;
	children: React.ReactNode;
}) => {
	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>{children}</DialogContent>
		</Dialog>
	);
};
