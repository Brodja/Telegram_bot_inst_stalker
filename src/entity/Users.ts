import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(type => DeviceUnit, {onDelete: 'SET NULL', nullable: true})
    @Column({ type: 'bigint', nullable: false, unique: true })
    user_id: number; //   id: 427996810,

    @Column()
    username: string; //   username: 'Brodja',

    @Column({ default: '' })
    firstName: string; //   first_name: 'Bohdan',

    @Column({ default: '' })
    lastName: string; //   last_name: 'Derkach',

    @Column({ type: 'bigint', nullable: false, unique: false })
    date_create: number; //   // date: 1643277227,

    @Column({ type: 'bigint', nullable: false, unique: false })
    last_action: number; //   // date: 1643277227,

    @Column({ type: 'bigint', nullable: false, unique: false, default: 0 })
    count_actions: number; //   // click start

}

