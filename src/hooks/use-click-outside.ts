import { useEffect, RefObject } from 'react';

type Props = {
	ref: RefObject<HTMLElement>;
	handler: () => void;
	ignoreRef?: RefObject<HTMLElement>;
};
export function useClickOutside({ ref, handler, ignoreRef }: Props) {
	useEffect(() => {
		function clickListener(e: MouseEvent) {
			if (!e.target) return;
			if (!(e.target instanceof Node)) return;

			const target = e.target;
			if (ignoreRef?.current?.contains(target)) return;
			if (ref.current?.contains(target)) return;

			handler();
		}
		function keyListener(e: KeyboardEvent) {
			if (e.key !== 'Escape') return;
			handler();
		}

		document.addEventListener('mousedown', clickListener);
		document.addEventListener('keydown', keyListener);
		return () => {
			document.removeEventListener('mousedown', clickListener);
			document.removeEventListener('keydown', keyListener);
		};
	}, [ref, handler, ignoreRef]);
}
