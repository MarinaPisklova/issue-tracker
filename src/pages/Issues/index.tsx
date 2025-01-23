import IssuesList from '@components/IssuesList';
import LabelsList from '@components/LabelsList';
import { StatusSelect } from '@components/StatusSelect';
import { useState } from 'react';
import { LinkButton } from './Issues.styled';

export default function Issues() {
    const [labels, setLabels] = useState<string[]>([]);
    const [status, setStatus] = useState('');

    return (
        <main>
            <section>
                <h1>Issues</h1>
                <IssuesList labels={labels} status={status} />
            </section>
            <aside>
                <LabelsList
                    selected={labels}
                    toggle={(label) =>
                        setLabels((currentLabels) =>
                            currentLabels.includes(label)
                                ? currentLabels.filter((currentLabel) => currentLabel !== label)
                                : currentLabels.concat(label),
                        )
                    }
                />
                <h3>Status</h3>
                <StatusSelect value={status} onChange={(event) => setStatus(event.target.value)} />
                <hr />
                <LinkButton to="/add">Add Issue</LinkButton>
            </aside>
        </main>
    );
}
