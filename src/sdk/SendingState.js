// authorship of the code below belongs to Ihor Yalovetskyi, who is not a CS50 course student

const SendingState = Object.freeze({
    Idle: 0,
    Sending: 1,
    Error: 2,
});

export default SendingState;