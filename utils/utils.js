module.exports = {
    deleteMessage: async (message, timeout = 10000) => {
        setTimeout(() => {
            message.delete();
        }, timeout);
    },
};
