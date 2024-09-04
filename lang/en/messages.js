const MESSAGES = {
    // User management
    1001: "User registred successfully",
    1002: "User login successfully",
    1003: "User dose not exists please register first",
    1004: "Email was alrdey exists",
    1005: "Password and confirm password are not same",
    1006: "Something went wrong in user registration",
    1007: "Something went wrong in user login",
    1008: "Password is wrong, please enter valid password",
    1009: "Something went wrong in user verification",
    1010: "You are unauthorized user for perform this task",
    1011: "No data found",
    1012: "Something went wrong in employee image update",
    1013: "Something went wrong in create review",
    1014: "Somethig went wrong in create exist review",
    1015: "Something went wrong in detele reviwe",
    // Common
    9000: "Please enter valid data!",
    9999: "Something went wrong!",
};

// Function to get message from message code
const getMessage = messageCode => {
    if (isNaN(messageCode)) {
        return messageCode;
    }
    return messageCode ? MESSAGES[messageCode] : '';
};

// exporting getMessage Function
module.exports = getMessage