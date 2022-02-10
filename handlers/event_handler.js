const fs = require('fs');
const ascii = require('ascii-table');
const table = new ascii().setHeading('Type', 'Event', 'Status', 'Single Fire').setAlign(2, ascii.CENTER).setAlign(3, ascii.CENTER);

module.exports = (client) => {
    const load_dir = (dirs) => {
        // Fetch all of the files in the `events` directory that end with the .js document pattern.
        const eventFiles = fs.readdirSync(`./events/${dirs}`).filter((file) => file.endsWith('.js'));

        // Loop through each event
        eventFiles.forEach((eventFile) => {
            // Require the new event file
            const event = require(`../events/${dirs}/${eventFile}`);
            // If the event is proper, and has a named type, set the client to react
            // on the event with the event's execute command. (Subscriber/Publisher Model)
            if (event.name) {
                client.on(event.name, (...args) => event.execute(...args, client));
                client.events.set(event.name, event);
                table.addRow(dirs, event.name, '✅', `${event.once ? '✅' : '❌'}`).setJustify();
            } else {
                table.addRow(dirs, eventFile, '❌', '➖').setJustify();
            }
        });
    };

    const eventTypes = fs.readdirSync('./events/').filter((path) => fs.statSync(`./events/${path}`).isDirectory());

    eventTypes.forEach((type) => {
        load_dir(type);
    });

    // client.events.status = table.toString();
    console.log(table.toString());
};
