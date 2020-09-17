import {createConnection, Connection} from "typeorm";

export let connect = async () => {
    const connection: Connection = await createConnection({
        type: "mongodb",
        host: "localhost",
        port: 27017,
        database: "test"
    });
console.log(connection)
};