import express from "express";
import { fileURLToPath } from 'url';

import path from "path";


// custom logic
import api from "./routes/api.js";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
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
// Port number
const PORT = process.env.PORT || 3000;

// Serve static files from 'public' directory
app.use(express.static('public'));

// Make Webix accessible from the 'public' directory
app.use('/webix', express.static(path.join(__dirname, 'node_modules', 'webix')));

// Use routes
app.use('/api', api);

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));