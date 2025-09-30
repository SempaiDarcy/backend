import { app } from './app';
import {runDb} from "./db/db";

const PORT = process.env.PORT || 5001;

const startApp = async () =>{
    await runDb()

    app.listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}`);
    });
}
startApp()
