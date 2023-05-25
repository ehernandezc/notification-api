import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedCategoriesTable1684654372282 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(
          `INSERT INTO categories (name) VALUES ('Sports'), ('Finance'), ('Movies');`,
        );
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
