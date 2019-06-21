import * as path from "path";
import { DielRuntime, DbType, DbSetupConfig } from "diel";
import { loadPage } from "./index";

const jsFile = "./node_modules/sql.js/js/worker.sql.js";

const dbConfigs: DbSetupConfig[] = [{
  dbType: DbType.Worker,
  jsFile,
  dataFile: path.resolve(__dirname, "../../assets/data/sensors_10000.sqlite")
},
];

export const diel = new DielRuntime({
  isStrict: true,
  showLog: true,
  setupCb: () => loadPage(),
  dielFiles: [],
  mainDbPath: null,
  dbConfigs,
});