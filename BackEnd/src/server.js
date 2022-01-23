const app = require("./index");
const port = process.env.PORT|| 2345;


const connect = require("./configs/db");


app.listen(port , async() =>{
    try{
        await connect();
        console.log(`Listening to port at ${port}....`);

    }
    catch(err){
        console.log(err);
    }
})