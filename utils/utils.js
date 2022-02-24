module.exports = {
    deleteMessage: async (message, timeout = 5000) => {
        setTimeout(() => {
            message.delete();
        }, timeout);
    },
};
