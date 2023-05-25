import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateNotificationsTable1684639438247 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'notifications',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'message', type: 'varchar', isNullable: false },
          { name: 'user_id', type: 'int', isNullable: false },
          { name: 'channel_id', type: 'int', isNullable: false },
          { name: 'category_id', type: 'int', isNullable: false },
          { name: 'created_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'notifications',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'notifications',
      new TableForeignKey({
        columnNames: ['channel_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'channels',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'notifications',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('notifications');
  }
}
