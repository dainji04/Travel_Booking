import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'nestjs_ecommerce',
  password: '13095',
  database: 'Travel-Booking-2',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: [],
  synchronize: true
};
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
