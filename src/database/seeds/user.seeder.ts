/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from '../../entity/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  track?: boolean;
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const repository = dataSource.getRepository(User);

    await repository.insert([
      {
        username: 'taesoo',
        name: 'taesookim',
        password: '1111',
      },
    ]);
  }
}
