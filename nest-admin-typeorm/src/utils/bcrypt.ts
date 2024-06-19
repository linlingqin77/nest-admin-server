import * as bcrypt from 'bcrypt';

const saltRounds = 10;

//加密
export function encryptPassword(password: string): string {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
}
//对比
export function comparePassword(
    password: string,
    oldPassword: string,
): boolean {
    return bcrypt.compareSync(password, oldPassword);
}


