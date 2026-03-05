import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import styles from './styles/index.module.scss';
import { CSSProperties, useState } from 'react';

export const App = () => {
	const [settings, setSettings] = useState(defaultArticleState);

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': settings.fontFamilyOption.value,
					'--font-size': settings.fontSizeOption.value,
					'--font-color': settings.fontColor.value,
					'--container-width': settings.contentWidth.value,
					'--bg-color': settings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				settings={settings}
				updateSettings={(newSettings) => setSettings(newSettings)}
			/>
			<Article />
		</main>
	);
};
