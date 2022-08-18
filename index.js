"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchApp = void 0;
// import { PluginImportType, PluginImportAction } from "@hyperledger/cactus-core-api";
const cactus_cmd_api_server_1 = require("@hyperledger/cactus-cmd-api-server");
const cactus_cmd_api_server_2 = require("@hyperledger/cactus-cmd-api-server");
const cactus_common_1 = require("@hyperledger/cactus-common");
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = require("http");
const log = cactus_common_1.LoggerProvider.getOrCreate({
    label: "cactus-api",
    level: "INFO",
});
dotenv_1.default.config();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const configService = new cactus_cmd_api_server_2.ConfigService();
    const apiServerOptions = yield configService.newExampleConfig();
    // If there is no configuration file on the file system, just set it to empty string
    apiServerOptions.configFile = "";
    // Enable CORS for
    apiServerOptions.apiCorsDomainCsv = "your.domain.example.com";
    apiServerOptions.authorizationProtocol = "NONE";
    apiServerOptions.apiPort = 3000;
    apiServerOptions.cockpitPort = 3100;
    apiServerOptions.grpcPort = 5000;
    // Disble TLS (or provide TLS certs for secure HTTP if you are deploying to production)
    apiServerOptions.apiTlsEnabled = true;
    apiServerOptions.plugins = [];
    const config = yield configService.newExampleConfigConvict(apiServerOptions);
    const app = (0, express_1.default)();
    const port = process.env.PORT;
    app.get('/', (req, res) => {
        log.info("Cactus: Hello World");
        res.send('Hello World - Server!');
    });
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
    const httpServerApi = (0, http_1.createServer)(app);
    const apiServer = new cactus_cmd_api_server_1.ApiServer({
        config: config.getProperties(),
        httpServerApi
    });
    // start the API server here and you are ready to roll
    apiServer.start();
});
function launchApp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield main();
            log.info(`Cactus API server launched OK `);
        }
        catch (ex) {
            log.error(`Cactus API server crashed: `, ex);
            process.exit(1);
        }
    });
}
exports.launchApp = launchApp;
if (require.main === module) {
    launchApp();
}
