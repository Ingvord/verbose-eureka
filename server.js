const express = require('express');
const path = require('path');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const app = express();

if (process.env.NODE_ENV === 'development') {
    app.disable('etag');
    app.use((req, res, next) => {
        res.set('Cache-Control', 'no-store');
        next();
    });
    // And adjust express.static configuration accordingly
}

// Swagger definition
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Proposals viewer API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/api.js'], // files containing annotations as above
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/explore', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// custom logic
const api = require('./routes/api');
// Port number
const PORT = process.env.PORT || 3000;

// Serve static files from 'public' directory
app.use(express.static('public'));

// Make Webix accessible from the 'public' directory
app.use('/webix', express.static(path.join(__dirname, 'node_modules', 'webix')));

// Use routes
app.use('/api', api);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));