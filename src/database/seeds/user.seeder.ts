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
        username: 'taesoo12',
        name: 'taesookim1',
        password: '1111',
      },
      {
        username: 'taesoo1',
        name: 'taesookim2',
        password: '1111',
      },
      {
        username: 'taesoo2',
        name: 'taesookim3',
        password: '1111',
      },
      {
        username: 'taesoo3',
        name: 'taesookim4',
        password: '1111',
      },
      {
        username: 'taesoo4',
        name: 'taesookim5',
        password: '1111',
      },
      {
        username: 'taesoo5',
        name: 'taesookim6',
        password: '1111',
      },
      {
        username: 'taesoo6',
        name: 'taesookim7',
        password: '1111',
      },
    ]);
  }
}
