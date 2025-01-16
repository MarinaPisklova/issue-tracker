import { Issue, Label, User, IssueComment } from '../src/types';

export const users: User[] = [
    {
        id: 'u_1',
        name: 'Tyler',
        profilePictureUrl:
            'data:image/jpeg;base64,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',
    },
    {
        id: 'u_2',
        name: 'Bono',
        profilePictureUrl:
            'https://pikuco.ru/upload/test_stable/e13/e131e3db319749d39d7c719e5da6a7ac.webp',
    },
    {
        id: 'u_3',
        name: 'Tanner',
        profilePictureUrl:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEuhKI6MA4hziJo6krARys8fQBUkHGkUxpiw&s',
    },
    {
        id: 'u_4',
        name: 'Alex',
        profilePictureUrl:
            'https://st.depositphotos.com/46542440/55684/i/450/depositphotos_556847160-stock-illustration-square-face-character-stiff-art.jpg',
    },
];

export const labels: Label[] = [
    { id: 'bug', color: 'red', name: 'bug' },
    { id: 'feature', color: 'blue', name: 'feature' },
    { id: 'enhancement', color: 'green', name: 'enhancement' },
    { id: 'question', color: 'orange', name: 'question' },
    { id: 'help', color: 'lime', name: 'help wanted' },
    { id: 'wontfix', color: 'gray', name: 'wontfix' },
    { id: 'duplicate', color: 'rebeccapurple', name: 'duplicate' },
];

const part1 = [
    'Dependencies',
    'The App',
    'Windows',
    'macOS',
    'Styling',
    'Button',
    'Target',
    'Input',
    'Field',
    'JavaScript',
    'React',
    'JQuery',
    'My Cookies',
];

const part2 = [
    'is having a problem',
    'seems to struggle',
    'throws an error',
    'makes my computer run slow',
    'causes the processor to heat up',
    'looks weird',
    "cannot read property 'length' of undefined",
    'is not working',
    'is not responding',
    'is not working properly',
    'is not working as expected',
    'is crashing',
    "won't run right",
    "is actually working fine. I just wanted to let you know you're great",
];
const part3 = [
    'when I rage click it',
    'on Tuesdays',
    'every time I wear my green shirt',
    "when I'm on a plane",
    "when I'm on a train",
    "when I'm on a boat",
    "when I'm on a bike",
    'right now',
    'all the time',
    'on weekends',
    "when I'm with Taylor Swift",
    'whenever I try to demo it',
];

const templateIssueComments = [
    "I'm on it!",
    "I'm not sure what the problem is.",
    "I'm working on it.",
    "I'm not sure how to fix it.",
    "I'm not sure if I can reproduce the problem.",
    'This is a really big deal for me.',
    'Has there been any progress on this?',
    'What is the status of this issue?',
    'Never mind, I figured out how to fix this',
    'Can you send me a little bit more information about the problem.',
    "I've reproduced this issue. Working on a fix now.",
    "I'm on it. I'll get back to you when I'm done.",
    'It would seem this is caused by user error.',
    'Whoops, I just dropped the production database. Hang on...',
];

const allStatus: ('backlog' | 'todo' | 'inProgress' | 'done' | 'cancelled')[] = [
    'backlog',
    'todo',
    'inProgress',
    'done',
    'cancelled',
];

export const issueComments: IssueComment[] = Array.from({ length: 500 }, (_, j) => ({
    id: `c_${j}`,
    createdDate: new Date(Date.now() - Math.floor(Math.random() * 10000000)),
    createdBy: users[Math.floor(Math.random() * users.length)].id,
    comment: templateIssueComments[Math.floor(Math.random() * templateIssueComments.length)],
})).sort((a, b) => {
    if (a.createdDate < b.createdDate) {
        return -1;
    }
    if (a.createdDate > b.createdDate) {
        return 1;
    }
    return 0;
});

export const issues: Issue[] = Array.from({ length: 1000 }, (_, i) => {
    const isCompleted = Math.random() > 0.9;

    const title = `${part1[Math.floor(Math.random() * part1.length)]} ${
        part2[Math.floor(Math.random() * part2.length)]
    } ${part3[Math.floor(Math.random() * part3.length)]}`;

    return {
        id: `i_${i}`,
        title,
        labels: [labels[Math.floor(Math.random() * labels.length)].id],
        comments: Array.from({ length: Math.round(Math.random() * 500) })
            .map(() => `c_${Math.round(Math.random() * 500)}`)
            .filter((a, i, arr) => arr.indexOf(a) === i),
        number: i + 1,
        status: isCompleted
            ? 'done'
            : allStatus.filter((f) => f !== 'done')[Math.floor(Math.random() * allStatus.length)],
        createdDate: new Date(Date.now() - Math.floor(Math.random() * 10000000)),
        createdBy: users[Math.floor(Math.random() * users.length)].id,
        assignee: Math.random() > 0.5 ? users[Math.floor(Math.random() * users.length)].id : null,
        dueDate:
            Math.random() > 0.5
                ? new Date(Date.now() + Math.floor(Math.random() * 10000000))
                : null,
        completedDate: isCompleted
            ? new Date(Date.now() + Math.floor(Math.random() * 10000000))
            : null,
    };
});
