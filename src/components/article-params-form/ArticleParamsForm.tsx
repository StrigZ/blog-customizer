import { ArrowButton } from 'src/ui/arrow-button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { useClickOutside } from 'src/hooks/use-click-outside';
import { Button } from 'src/ui/button';
import { ArticleStateType } from 'src/constants/articleProps';

type Props = {
	settings: ArticleStateType;
	resetForm: () => void;
	updateSettings: (newSettings: ArticleStateType) => void;
};
export const ArticleParamsForm = ({
	// settings,
	// updateSettings,
	resetForm,
}: Props) => {
	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef<HTMLElement>(null);
	const arrowRef = useRef<HTMLDivElement>(null);

	useClickOutside({
		ref: asideRef,
		handler: () => setIsOpen(false),
		ignoreRef: arrowRef,
	});

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();
		// apply new settings
		// setSettings(newSettings);
	};

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
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={resetForm}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
