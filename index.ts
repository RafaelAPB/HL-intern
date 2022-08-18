// import { PluginImportType, PluginImportAction } from "@hyperledger/cactus-core-api";
import { ApiServer } from "@hyperledger/cactus-cmd-api-server";
import { ConfigService } from "@hyperledger/cactus-cmd-api-server";
import { Logger, LoggerProvider } from "@hyperledger/cactus-common";
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import {createServer} from 'http'




const log: Logger = LoggerProvider.getOrCreate({
  label: "cactus-api",
  level: "INFO",
});
dotenv.config();



const main = async () => {

  const configService = new ConfigService();
  const apiServerOptions: any = await configService.newExampleConfig();
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
  apiServerOptions.plugins = []
  const config = await configService.newExampleConfigConvict(apiServerOptions);


const app = express()
const port = process.env.PORT

app.get('/', (req:Request, res:Response) => {
  log.info("Cactus: Hello World")
  res.send('Hello World - Server!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

  const httpServerApi = createServer(app)

  const apiServer = new ApiServer({
    config: config.getProperties(),
    httpServerApi
  });
  // start the API server here and you are ready to roll
  apiServer.start();
};

export async function launchApp(): Promise<void> {
  try {
    await main();
    log.info(`Cactus API server launched OK `);
  } catch (ex) {
    log.error(`Cactus API server crashed: `, ex);
    process.exit(1);
  }
}

if (require.main === module) {
  launchApp();
}
