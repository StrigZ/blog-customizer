import { useEffect, RefObject } from 'react';

type Props = {
	ref: RefObject<HTMLElement>;
	handler: () => void;
	ignoreRef?: RefObject<HTMLElement>;
	shouldAttachListeners?: boolean;
};
export function useClickOutside({
	ref,
	handler,
	ignoreRef,
	shouldAttachListeners = true,
}: Props) {
	useEffect(() => {
		if (!shouldAttachListeners) return;

		function handleClick(e: MouseEvent) {
			if (!e.target) return;
			if (!(e.target instanceof Node)) return;

			const target = e.target;
			if (ignoreRef?.current?.contains(target)) return;
			if (ref.current?.contains(target)) return;

			handler();
		}
		function handleKeyDown(e: KeyboardEvent) {
			if (e.key !== 'Escape') return;
			handler();
		}

		document.addEventListener('mousedown', handleClick);
		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('mousedown', handleClick);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [ref, handler, ignoreRef, shouldAttachListeners]);
}
