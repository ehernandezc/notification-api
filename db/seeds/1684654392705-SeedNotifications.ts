import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedNotificationsTables1684654392705 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {

        await queryRunner.query(
          `INSERT INTO notifications
          VALUES 
            (1,'This is an sport message to everybody!',1,1,1,'2023-05-25 02:35:06'),
            (2,'This is an sport message to everybody!',2,3,1,'2023-05-25 02:35:06'),
            (3,'This is an sport message to everybody!',2,1,1,'2023-05-25 02:35:06'),
            (4,'This is an sport message to everybody!',1,2,1,'2023-05-25 02:35:06'),
            (5,'This is an sport message to everybody!',1,3,1,'2023-05-25 02:35:06'),
            (6,'Have you heard of bitcoin?',1,1,2,'2023-05-25 02:35:56'),
            (7,'Have you heard of bitcoin?',3,2,2,'2023-05-25 02:35:56'),
            (8,'Have you heard of bitcoin?',1,3,2,'2023-05-25 02:35:56'),
            (9,'Have you heard of bitcoin?',1,2,2,'2023-05-25 02:35:56'),
            (10,'Have you seen Mario movie?',1,2,3,'2023-05-25 02:37:20'),
            (11,'Have you seen Mario movie?',2,1,3,'2023-05-25 02:37:20'),
            (12,'Have you seen Mario movie?',1,3,3,'2023-05-25 02:37:20'),
            (13,'Have you seen Mario movie?',1,1,3,'2023-05-25 02:37:20'),
            (14,'Have you seen Mario movie?',2,3,3,'2023-05-25 02:37:20');`
        );
      }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
