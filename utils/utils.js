module.exports = {
    deleteMessage: async (message, timeout = 10000) => {
        setInterval(() => {
            message.delete();
        }, timeout);
    },
};
