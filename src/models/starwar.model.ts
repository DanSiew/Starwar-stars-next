export interface StarwarStateModel {
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    data: PeopleResponse | undefined;
    currentPage: number;
};


export interface PeopleResponse {
    count: number;
    next: string;
    previous: string;
    numberPages: number;
    pageNumber: number[];
    currentPage: number;
    results: People[]
};

export interface People {
    id: string;
    name: string;
    height: number;
    mass: number;
    birth_year: string;
    gender: string;
    url: string;
    detail?: string;
}

export interface PeopleListModel {
    starwarState: StarwarStateModel;
    getPeople: (index: number) => void;
}

export interface PeopleStateModel {
    status: 'idle' | 'pending' | 'succeeded' | 'failed';
    data: People | undefined;
};