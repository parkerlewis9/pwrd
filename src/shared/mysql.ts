import { ConnectionOptions } from 'typeorm'
import { Vote } from '@entity'

export const dbConfig: ConnectionOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "poweredtest",
    password: "thisisfakedonthackme",
    database: "test",
    entities: [
        Vote
    ],
    synchronize: true,
    logging: false
}
