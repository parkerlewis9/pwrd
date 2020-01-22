import { ConnectionOptions } from 'typeorm'
import { Vote } from '@entity'

export const dbConfig: ConnectionOptions = {
    type: "mysql",
    host: "pwrd-mysql-test",
    port: 3306,
    username: "root",
    password: "thisisfakedonthackme",
    database: "test",
    entities: [
        Vote
    ],
    synchronize: true,
    logging: false
}
