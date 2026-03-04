import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import { useClickOutside } from 'src/hooks/use-click-outside';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef<HTMLElement>(null);
	const arrowRef = useRef<HTMLDivElement>(null);

	useClickOutside({
		ref: asideRef,
		handler: () => setIsOpen(false),
		ignoreRef: arrowRef,
	});

	return (
		<>
			<ArrowButton
				isOpen={isOpen}
				onClick={() => setIsOpen((pv) => !pv)}
				ref={arrowRef}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={asideRef}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
