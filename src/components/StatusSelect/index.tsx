import { possibleStatus } from 'src/consts';
import { StyledStatusSeelect } from './StatusSelect.styles';

interface IStatusSelect {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function StatusSelect({ value, onChange }: IStatusSelect) {
    return (
        <StyledStatusSeelect value={value} onChange={onChange}>
            <option value="">Select a status to filter</option>
            {possibleStatus.map((status) => (
                <option value={status.id} key={status.id}>
                    {status.label}
                </option>
            ))}
        </StyledStatusSeelect>
    );
}
