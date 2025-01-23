export interface User {
    id: string;
    name: string;
    profilePictureUrl: string;
}

export interface Label {
    id: string;
    name: string;
    color: string;
}
export type IssueStatus = 'backlog' | 'todo' | 'inProgress' | 'done' | 'cancelled';

export interface Issue {
    id: string;
    number: number;
    title: string;
    status: IssueStatus;
    dueDate: Date | null;
    createdDate: Date;
    createdBy: string;
    completedDate: Date | null;
    assignee: string | null;
    labels: string[];
    comments: string[];
}

export interface IssueComment {
    id: string;
    comment: string;
    createdDate: Date;
    createdBy: string;
}

export interface AddIssueBody {
    title: string;
    comment: string;
}
