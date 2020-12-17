import Mysql from 'mysql';
import appRoot from 'app-root-path';
const config = require(appRoot + '/fadab.config');

export default () => {
  return Mysql.createPool(config.mysql);
};
