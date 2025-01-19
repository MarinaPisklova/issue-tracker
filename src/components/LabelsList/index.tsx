import { useLabelsData } from 'src/helpers/useLabelsData';
import { LabelButton, LabelsListWrapper, LabelsWrapper } from './LabelsList.styles';

interface ILabelsList {
    selected: string[];
    toggle: (label: string) => void;
}

export default function LabelsList({ selected, toggle }: ILabelsList) {
    const labelsQuery = useLabelsData();

    return (
        <LabelsWrapper>
            <h3>Labels</h3>
            {labelsQuery.isLoading ? (
                <p>Loading...</p>
            ) : (
                <LabelsListWrapper>
                    {labelsQuery.data?.map((label) => (
                        <li key={label.id}>
                            <LabelButton
                                onClick={() => toggle(label.id)}
                                className={`${selected.includes(label.id) ? 'selected ' : ''}${
                                    label.color
                                }`}
                            >
                                {label.name}
                            </LabelButton>
                        </li>
                    ))}
                </LabelsListWrapper>
            )}
        </LabelsWrapper>
    );
}
