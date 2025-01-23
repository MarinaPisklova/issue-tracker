import { possibleStatus } from 'src/consts';
import { StyledStatusSeelect } from './StatusSelect.styles';

interface IStatusSelect {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    noEmptyOption?: boolean;
}

export function StatusSelect({ value, onChange, noEmptyOption = false }: IStatusSelect) {
    return (
        <StyledStatusSeelect value={value} onChange={onChange}>
            {noEmptyOption ? null : <option value="">Select a status to filter</option>}
            {possibleStatus.map((status) => (
                <option value={status.id} key={status.id}>
                    {status.label}
                </option>
            ))}
        </StyledStatusSeelect>
    );
}
