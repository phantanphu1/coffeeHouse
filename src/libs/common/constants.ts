export const generateRandomCode = (n) => {
    let str = '';
    for (let i = 0; i < n; i++) {
        str += Math.floor(Math.random() * 10);
    }
    return str;
};

export const randomNumber = (min, max) => {
    const random = Math.random();
    const randomNumber = Math.floor(random * (max - min + 1)) + min;
    return randomNumber;
};

export const randomString = (length) => {
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
};

export const Role = {
    Admin: 1,
    User: 2
  }