import axios from 'axios';
import fs from 'fs';
import path from 'path';
import https from 'https';
import config from '../config';

const certificate = fs.readFileSync(
    path.resolve(__dirname, `../../certificates/${config.pix.certificate}`)
);

const agent = new https.Agent({
    pfx: certificate,
    passphrase: ''
});

const authenticate = () => {
    const credentials = Buffer.from(
        `${config.pix.clientId}:${config.pix.clientSecret}`
    ).toString('base64');

    return axios({
        method: 'POST',
        url: `${config.pix.url}/oauth/token`,
        headers: {
            Authorization: `Basic ${credentials}`,
            'Content-Type': 'application/json'
        },
        httpsAgent: agent,
        data: {
            grant_type: 'client_credentials'
        }
    });
};

const setupApiPixClient = async () => {
    const authResponse = await authenticate();
    const accessToken = authResponse.data?.access_token;

    return axios.create({
        baseURL: config.pix.url,
        httpsAgent: agent,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });
}

const apiPix = setupApiPixClient();

const cobGenerator = async (amount: string, donation_name: string,) => {
    const api = await apiPix;
    const dataCob = {
        calendario: {
            expiracao: 3600
        },
        valor: {
            original: amount
        },
        chave: config.pix.pixKey,
        solicitacaoPagador: `Doação solidária para a campanha chamada ${donation_name}`
    };

    const cobResponse = await api.post('/v2/cob', dataCob);
    return cobResponse;
}

const qrCodeGenerator = async (loc_id: number) => {
    const api = await apiPix;
    const qrcodeResponse = await api.get(`/v2/loc/${loc_id}/qrcode`);
    return qrcodeResponse;
}

export { apiPix, cobGenerator, qrCodeGenerator };
