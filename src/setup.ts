import * as path from "path";
import { DielRuntime, DbType, DbSetupConfig } from "diel";
import { loadPage } from "./index";

const jsFile = "./node_modules/sql.js/js/worker.sql.js";

const dbConfigs: DbSetupConfig[] = [{
  dbType: DbType.Socket,
  connection: "ws://localhost:8999",
  message: {dbName: "sensors"}
},
];

export const diel = new DielRuntime({
  isStrict: true,
  showLog: true,
  caching: false,
  setupCb: () => loadPage(),
  dielFiles: ["./assets/diel/views.diel"],
  mainDbPath: null,
  dbConfigs,
});