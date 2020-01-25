import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";
import moment = require('moment');

@Entity()
export class Vote {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    timestamp: number = moment().unix();

    @Column()
    value: string = 'ERROR';
}
