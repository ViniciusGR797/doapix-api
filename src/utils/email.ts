import fs from 'fs';
import nodemailer from 'nodemailer';
import config from '../config';
import { User } from '../models/userModel';

const transporter = nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.secure,
    auth: {
        user: config.email.auth.user,
        pass: config.email.auth.pass,
    },
});

export interface EmailOptions {
    from?: string;
    to: string;
    replyTo?: string;
    subject: string;
    text?: string;
    html?: string;
    attachments?: { filename: string; path: string }[];
}

export async function sendEmail(options: EmailOptions): Promise<void> {
    options.from = options.from || config.email.auth.user;
    options.replyTo = options.replyTo || config.email.auth.user;

    try {
        await transporter.sendMail(options).then((response) => console.log("E-mail enviado com sucesso!"));

        if (options.attachments) {
            options.attachments.forEach((attachment) => {
                fs.unlinkSync(attachment.path);
            });
        }
    } catch (error) {
        console.error('Erro ao enviar o e-mail:', error);
    }
}

export async function generateRandomPassword(length: number): Promise<string> {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    const passwordLength = 8;
    let password = '';

    password += charset[Math.floor(Math.random() * 26)];
    password += charset[52 + Math.floor(Math.random() * 10)];
    password += charset[62 + Math.floor(Math.random() * 12)];

    for (let i = 0; i < passwordLength - 3; i++) {
        password += charset[Math.floor(Math.random() * charset.length)];
    }

    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
}

export async function generateRandomCode(length: number): Promise<string> {
    const randomNumber = Math.floor(Math.random() * 1000000);
    const code = randomNumber.toString().padStart(length, '0');
    return code;
}

export class TemplateEmail {
    static requestRecover(user: User): string {
        const emailBody = `
            <h1>Olá</h1> 
            <p>Recebemos sua solicitação de redefinição de senha! Seu código verificador é ${user.code_recover_pwd}</p>
        `;

        return emailBody;
    }
}