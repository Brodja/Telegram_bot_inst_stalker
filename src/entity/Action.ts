import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Action {

    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(type => DeviceUnit, {onDelete: 'SET NULL', nullable: true})
    @Column({type: 'bigint', nullable: false})
    user_id: number; //   id: 427996810,

    @Column({default: 'USE DEFAULT'})
    email: string; 

    @Column({default: 'USE DEFAULT'})
    password: string; 

    @Column()
    nickname: string;

    @Column({type: 'bigint', nullable: false, unique: false})
    date_action: number; 

    // @ManyToOne(type => DeviceUnit, {onDelete: 'SET NULL', nullable: true})
    @Column({type: 'bigint', nullable: true, unique: false})
    result_id: number;  

    @Column()
    success: boolean; 
}

