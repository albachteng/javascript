const { createHash } = require('crypto');

// create a string hash

function hash(input) {
    return createHash('sha256').update(input).digest('hex');
}

let password = 'hi-mom!';
const hash1 = hash(password);

password = 'hi-mom';
const hash2 = hash(password);
const match = hash1 === hash2;

console.log(match ? 'good password' : 'password does not match');


const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

const users = [];

function signup(email, password) {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64).toString('hex');

    const user = { email, password: `${salt}:${hashedPassword}` }
    
    users.push(user);

    return user;
}

function login(email, password) {
    const user = users.find((v) => v.email === email);

    const [salt, key] = user.password.split(':'); 
    const hashedBuffer = scryptSync(password, salt, 64);

    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);
    

    return match ? 'login success!' : 'login failed!'; 
}

signup('albachteng@gmail.com', 'helloWorld!');
