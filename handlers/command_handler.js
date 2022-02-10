const fs = require('fs');
const ascii = require('ascii-table');
const table = new ascii()
    .setHeading('Command', 'Status', 'Aliases', 'Completed')
    .setAlign(1, ascii.CENTER)
    .setAlign(2, ascii.LEFT)
    .setAlign(3, ascii.CENTER);

module.exports = (client) => {
    // Fetch all files in the `commands` directory that have file ending of .js
    const commands = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'));

    commands.forEach((file) => {
        // Loop through each file and require the js file itself.

        try {
            let command = require(`../commands/${file}`);
            if (command.name && command.execute) {
                // Determine if the file is a command file with a name, if so, set the client array of commands to be based off the name
                client.commands.set(command.name, command);

                // Check for command aliases
                if (command.aliases && Array.isArray(command.aliases)) {
                    command.aliases.forEach((alias) => {
                        return client.aliases.set(alias, command.name);
                    });
                }
                table
                    .addRow(command.name, '✅', `${command.aliases ? command.aliases.toString() : ''}`, `${command.complete ? '✅' : '❌'}`)
                    .setJustify();
            }
        } catch (error) {
            console.error(`Couldn't load ${file}: ${error}`);
            table.addRow(file, '❌', '➖', '➖').setJustify();
        }
    });
    // client.commands.status = table.toString();
    console.log(table.toString());
};
