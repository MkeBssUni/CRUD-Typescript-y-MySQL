import bcrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
    const salt= await bcrypt.genSalt(15);
    const hashedPassword= await bcrypt.hash(password, salt);
    console.log(hashedPassword);
    return hashedPassword
}

export const validatePassword= async (password: string, hashedPassword:string)=> {
    return await bcrypt.compare(password, hashedPassword);
}