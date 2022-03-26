const app= require('./index');

const connect= require('./configs/db');

app.listen(3700, async()=>{
    try {
        await connect()
        console.log('listening on port 3700');

    }catch(err){

        console.log(err.message);

   }

});