webix.ui({
    // container: "app",
    cols: [ // Use cols for a horizontal layout
        {
            view: "datatable",
            id: "proposalsTable",
            select: true,
            columns: [
                { id: "proposal_number", header: "Proposal Number", width: 200 },
                { id: "abstract", header: "Abstract", fillspace: true },
                // Define other proposal columns as needed
            ],
            url: "/api/proposals", // Endpoint to fetch proposals
            on: {
                onAfterSelect: function (selectedId) {
                    // Upon selecting a proposal, load corresponding users
                    const proposalNumber = this.getItem(selectedId.id).proposal_number; // Assuming 'id' is the identifier
                    $$("usersTable").clearAll(); // Clear previous entries
                    $$("usersTable").load("/api/users/" + proposalNumber); // Adjust the endpoint as necessary
                }
            }
        },
        {
            view: "resizer" // Optional: Adds a resizer between the tables
        },
        {
            view: "datatable",
            id: "usersTable",
            columns: [
                { id: "name", header: "Name", fillspace: true },
                { id: "orcid", header: "ORCID", width: 200 },
                // Define other user columns as needed
            ],
            // Initially empty, to be populated based on the selected proposal
        }
    ]
});