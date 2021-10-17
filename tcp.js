const net = require("net")
var temp

const server = net.createServer(socket => {

    socket.on("data", data => {
        console.log(typeof data);
        //console.log(data.toString())
        proccess(data);
    })
})

function proccess(data) {

    /* if ((data.resource) && (process.env.PORT)) {
        specs.port = parseInt(process.env.PORT);
        specs.access_token = process.env.TOKEN;
        listener.verifyAccessToken(process.env.TOKEN).then((person) => {
            console.log(fonts.info(`token authenticated as ${person.displayName}`));
            specs.selection.event = 'created';
            for (let resource_object of cli.firehose_resource_names) { 
                listener.runListener(specs, cli.options[resource_object]);
            }
            }).catch(reason => {
                //token not authorized
                console.log(fonts.error(reason));
                process.exit(-1);
          });
    } else {
        cli.welcome();
        gatherSpecs();
    } */

    console.log(Object.getOwnPropertyNames(data));



}



server.listen(50001)