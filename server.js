import http from "http";
import express from "express";
import { initialize, use } from "@oas-tools/core";

const _ContentTypeMiddleware = (_, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
};

const deploy = async () => {
    const serverPort = process.env.PORT ?? 8080;
    const app = express();

    use(_ContentTypeMiddleware, {}, 0);
    use(express.json({limit: '50mb'}), {}, 0);

    initialize(app).then(() => {
        http.createServer(app).listen(serverPort, () => {
            console.log("\nApp running at http://localhost:" + serverPort);
            console.log("________________________________________________________________");
            console.log('API docs (Swagger UI) available on http://localhost:' + serverPort + '/docs');
            console.log("________________________________________________________________");
        });
    });
}

const undeploy = () => {
  process.exit();
};

export default {deploy, undeploy}

