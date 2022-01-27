import {MigrationInterface, QueryRunner} from "typeorm";

export class addTResAct1643284326473 implements MigrationInterface {
    name = 'addTResAct1643284326473'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "create_date" TO "date_create"`);
        await queryRunner.query(`CREATE TABLE "action" ("id" SERIAL NOT NULL, "user_id" bigint NOT NULL, "email" character varying NOT NULL DEFAULT 'USE DEFAULT', "password" character varying NOT NULL DEFAULT 'USE DEFAULT', "nickname" character varying NOT NULL, "date_action" bigint NOT NULL, "result_id" bigint, "success" boolean NOT NULL, CONSTRAINT "PK_2d9db9cf5edfbbae74eb56e3a39" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "result" ("id" SERIAL NOT NULL, "action_id" bigint, "user_id" bigint NOT NULL, "count_folovers" integer NOT NULL, "count_foloving" integer NOT NULL, "list_folovers" json, "list_foloving" json, CONSTRAINT "UQ_5c7ea952ae3947255abac7cef57" UNIQUE ("user_id"), CONSTRAINT "PK_c93b145f3c2e95f6d9e21d188e2" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "result"`);
        await queryRunner.query(`DROP TABLE "action"`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "date_create" TO "create_date"`);
    }

}
