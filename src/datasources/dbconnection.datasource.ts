import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'dbconnection',
  connector: 'postgresql',
  url: '',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'whatthecodedb'
};


@lifeCycleObserver('datasource')
export class DbconnectionDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'dbconnection';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.dbconnection', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
