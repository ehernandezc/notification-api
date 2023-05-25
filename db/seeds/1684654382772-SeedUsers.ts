import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUsersTables1684654382772 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.query(
          `INSERT INTO users (name, email, phone_number) 
          VALUES
            ('Juan Perez', 'juan@test.com', '1234567890'),
            ('Alberto Garcia', 'alberto@test.com', '1112223333'),
            ('Maria Lopez', 'maria@test.com', '5557778888');`,
        );

        await queryRunner.query(
          `INSERT INTO users_categories (user_id, category_id) 
          VALUES
            (1, 1),
            (1,2),
            (1,3),
            (2,1),
            (2,3),
            (3,2);`,
        );

        await queryRunner.query(
            `INSERT INTO users_channels (user_id, channel_id) 
            VALUES 
              (1, 1),
              (1,2),
              (1,3),
              (2,1),
              (2,3),
              (3,2);`,
          );
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
