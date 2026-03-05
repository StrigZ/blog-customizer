import { ArrowButton } from 'src/ui/arrow-button';

import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { useClickOutside } from 'src/hooks/use-click-outside';
import { Button } from 'src/ui/button';
import {
	ArticleStateOption,
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';

type Props = {
	articleState: ArticleStateType;
	updateArticleState: (newArticleState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleState,
	updateArticleState,
}: Props) => {
	const [formState, setFormState] = useState(articleState);
	const [isOpen, setIsOpen] = useState(false);
	const asideRef = useRef<HTMLElement>(null);
	const arrowRef = useRef<HTMLDivElement>(null);

	useClickOutside({
		ref: asideRef,
		handler: () => {
			setIsOpen(false);
			setFormState(articleState);
		},
		ignoreRef: arrowRef,
	});

	const handleArrowClick = () => {
		setIsOpen((pv) => !pv);
		setFormState(articleState);
	};

	const handleFormUpdate = (title: ArticleStateOption, option: OptionType) => {
		setFormState((pv) => ({ ...pv, [title]: option }));
	};

	const handleFormSubmit = (e: FormEvent) => {
		e.preventDefault();

		updateArticleState(formState);
		setIsOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={handleArrowClick} ref={arrowRef} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={asideRef}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={formState.fontFamilyOption}
						onChange={(selected) =>
							handleFormUpdate('fontFamilyOption', selected)
						}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						selected={formState.fontSizeOption}
						onChange={(selected) =>
							handleFormUpdate('fontSizeOption', selected)
						}
						name={formState.fontSizeOption.title}
						title='Размер шрифта'
						options={fontSizeOptions}
					/>
					<Select
						selected={formState.fontColor}
						onChange={(selected) => handleFormUpdate('fontColor', selected)}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={formState.backgroundColor}
						onChange={(selected) =>
							handleFormUpdate('backgroundColor', selected)
						}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={formState.contentWidth}
						onChange={(selected) => handleFormUpdate('contentWidth', selected)}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={() => setFormState(defaultArticleState)}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
