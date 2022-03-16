import { Container } from "inversify";
import { SERVICES, ADAPTERS, CONTROLLERS } from "./Types";
import { MutantService } from "../../domain/port/api/MutantService";
import { StaticPropsMetadataReader } from "./StaticPropsMetadataReader";
import { MutantController } from "../../application/controller/MutantController";
import { MutantControllerImp } from "../../application/controller/http/MutantControllerImp";
import { MutantServiceImp } from "../../domain/service/MutantServiceImp";
import { DynamoConnector } from "../../domain/port/spi/DynamoConnector";
import { DynamoConnectorImp } from "../provider/aws/DynamoConnectorImp";

const AppContainer: Container = new Container();
AppContainer.applyCustomMetadataReader(new StaticPropsMetadataReader());
AppContainer.bind<MutantController>(CONTROLLERS.MutantController).to(
  MutantControllerImp
);
AppContainer.bind<MutantService>(SERVICES.MutantService).to(MutantServiceImp);
AppContainer.bind<DynamoConnector>(ADAPTERS.DynamoConnector).to(
  DynamoConnectorImp
);

export { AppContainer };
