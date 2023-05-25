import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedChannelsTable1684654372290 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
          `INSERT INTO channels (name) VALUES ('SMS'), ('E-Mail'), ('Push Notification');`,
        );
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
