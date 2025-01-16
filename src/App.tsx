import { Link, Route, Routes, useMatch } from 'react-router';
import { AppContainer } from './App.styles';
import Issues from '@pages/Issues';
import AddIssue from '@pages/AddIssue';
import Issue from '@pages/Issue';

function App() {
    const isRootPath = useMatch({ path: '/', end: true });

    return (
        <AppContainer>
            {!isRootPath ? <Link to="/">Back to Issues List</Link> : null}
            <h1>Issue Tracker</h1>
            <Routes>
                <Route path="/" element={<Issues />} />
                <Route path="/add" element={<AddIssue />} />
                <Route path="/issue/:number" element={<Issue />} />
            </Routes>
        </AppContainer>
    );
}

export default App;
