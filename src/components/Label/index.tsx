import { useLabelsData } from 'src/helpers/useLabelsData';

import { Label as LabelType } from 'src/types';
import { LabelWrapper } from './Label.styles';

interface ILabel {
    label: string;
}

export function Label({ label }: ILabel) {
    const labelQuery = useLabelsData();

    if (labelQuery.isLoading) return null;
    const labelObj = labelQuery.data?.find((queryLabel: LabelType) => queryLabel.id === label);

    if (!labelObj) return null;

    return <LabelWrapper className={labelObj.color}>{labelObj.name}</LabelWrapper>;
}
