import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Vote {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    value: string = 'ERROR';
}
