import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { ListInterface } from "../interface/list.interface";

@Entity()
export class Result {

    @PrimaryGeneratedColumn()
    id: number;

    // @ManyToOne(type => DeviceUnit, {onDelete: 'SET NULL', nullable: true})
    @Column({type: 'bigint', nullable: true, unique: false})
    action_id: number; 

    // @ManyToOne(type => DeviceUnit, {onDelete: 'SET NULL', nullable: true})
    @Column({type: 'bigint', nullable: false, unique: true})
    user_id: number;

    @Column()
    count_folovers: number; 

    @Column()
    count_foloving: number; 
    
    @Column({type: 'json',  nullable: true,})
    list_folovers: ListInterface[];

    @Column({type: 'json',  nullable: true,})
    list_foloving: ListInterface[];

  

}

