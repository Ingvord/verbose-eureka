import {range} from "../../src/utils.js";
// Mock data for demonstration
const experiments = [
    { id: 1, proposal_number: 'EXP-001', abstract: 'Study on XYZ', begin_date: '2024-01-01', end_date: '2024-06-30' },
    { id: 2, proposal_number: 'EXP-002', abstract: 'Research on ABC', begin_date: '2024-02-01', end_date: '2024-07-15' },
];


// Mock data for demonstration
const users = [
    { id: 1, name: 'John Doe', orcid: '0000-0001-2345-6789' },
    { id: 2, name: 'Jane Smith', orcid: '0000-0002-3456-7890' },
    { id: 3, name: 'Alice Smith', orcid: '0000-0003-4567-8901'},
    { id: 4, name: 'Bob Johnson', orcid: '0000-0004-5678-9012'},
];

// Mock data for demonstration
const joint = [
    { id: 1, proposal_number: 'EXP-001', users: [
            { id: 1, name: 'John Doe', orcid: '0000-0001-2345-6789' },
            { id: 2, name: 'Jane Smith', orcid: '0000-0002-3456-7890' },
        ] },
    { id: 2, proposal_number: 'EXP-002', users: [
            { id: 1, name: 'John Doe', orcid: '0000-0001-2345-6789' },
            { id: 3, name: 'Alice Smith', orcid: '0000-0003-4567-8901'},
            { id: 4, name: 'Bob Johnson', orcid: '0000-0004-5678-9012'}
        ] },
];



function randomUsers(howMany = 200){
    return range(1,howMany).map(i => ({
        name: `User ${i}`,
        orcid: `0000-0002-${String(i).padStart(4, '0')}-7890`
    }))
}

function randomExperiments(howMany = 1000){
    return range(1,howMany).map(i => ({
        proposal_number: `EXP-${String(i).padStart(3, '0')}`,
        abstract: `Abstract for experiment ${i}`,
        begin_date:'2024-01-01',
        end_date:'2024-01-31',
    }))
}

export {
    users,
    experiments,
    joint,
    randomUsers,
    randomExperiments,
};