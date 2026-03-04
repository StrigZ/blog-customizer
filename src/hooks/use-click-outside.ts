import { useEffect, RefObject } from 'react';

type Props = {
	ref: RefObject<HTMLElement>;
	handler: () => void;
	ignoreRef?: RefObject<HTMLElement>;
};
export function useClickOutside({ ref, handler, ignoreRef }: Props) {
	useEffect(() => {
		if (!ref.current) return;

		function clickListener(e: MouseEvent) {
			if (!e.target) return;

			const target = e.target as Node;
			if (ignoreRef?.current?.contains(target)) return;
			if (ref.current?.contains(target)) return;

			handler();
		}
		function keyListener(e: KeyboardEvent) {
			if (e.key !== 'Escape') return;
			handler();
		}

		document.addEventListener('click', clickListener);
		document.addEventListener('keydown', keyListener);
		return () => {
			document.removeEventListener('click', clickListener);
			document.removeEventListener('keydown', keyListener);
		};
	}, [ref, handler, ignoreRef]);
}
