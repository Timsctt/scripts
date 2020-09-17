import {MigrationInterface, QueryRunner} from "typeorm";
import {getMongoManager} from "typeorm";

export class CreateMovieTable1600207733442 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const profile = {
            about:"About Trees and Me",
            education:"Tree School"
        }
        const manager = getMongoManager();
        await manager.save(profile);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }


}
