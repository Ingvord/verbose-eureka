// Mock data for demonstration
const experiments = [
    { id: 1, proposal_number: 'EXP-001', abstract: 'Study on XYZ', begin_date: '2024-01-01', end_date: '2024-06-30' },
    { id: 2, proposal_number: 'EXP-002', abstract: 'Research on ABC', begin_date: '2024-02-01', end_date: '2024-07-15' },
];


// Mock data for demonstration
const users = [
    { id: 1, name: 'John Doe', orcid: '0000-0001-2345-6789' },
    { id: 2, name: 'Jane Smith', orcid: '0000-0002-3456-7890' },
];

// Mock data for demonstration
const joint = [
    { id: 1, proposal_number: 'EXP-001', users: [
            { id: 1 },
            { id: 2 }
        ] },
    { id: 2, proposal_number: 'EXP-002', users: [
            {id: 2 }
        ] },
];

module.exports = {
    users,
    experiments,
    joint
};