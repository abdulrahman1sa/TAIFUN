export interface Faculty {
    id: number;
    name: string;
}

export interface Subject {
    id: number;
    name: string;
    facultyId: number;
}

export interface Section {
    id: number;
    sectionNumber: string;
    subjectId: number;
}

export interface Group {
    id: number;
    sectionId: number;
    telegramLink: string;
    groupName: string | null;
    status: 'approved' | 'pending' | 'hidden' | 'rejected';
    upvotes: number;
    downvotes: number;
    createdAt: string;
}
