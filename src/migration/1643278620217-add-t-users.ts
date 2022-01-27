import {MigrationInterface, QueryRunner} from "typeorm";

export class addTUsers1643278620217 implements MigrationInterface {
    name = 'addTUsers1643278620217'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "user_id" bigint NOT NULL, "username" character varying NOT NULL, "firstName" character varying NOT NULL DEFAULT '', "lastName" character varying NOT NULL DEFAULT '', "create_date" bigint NOT NULL, "last_action" bigint NOT NULL, "count_actions" bigint NOT NULL DEFAULT '0', CONSTRAINT "UQ_96aac72f1574b88752e9fb00089" UNIQUE ("user_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
