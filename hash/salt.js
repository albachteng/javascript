const { scryptSync, randomBytes } = require('crypto');

const users = [];

function signup(email, password) {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = scryptSync(password, salt, 64);

    const user = { email, password: `${salt}:$hashedPasssword}` }
    
    users.push(user);

    return user;
}

function login(email, password) {
    const user = users.find((user) => user.email === email);

    const [salt, key] = user.password.split(':'); 
    const hashedBuffer = scriptSync(password, salt, 64);

    const keyBuffer = Buffer.from(key, 'hex');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    return match ? 'login success!' : 'login failed!'; 
}
