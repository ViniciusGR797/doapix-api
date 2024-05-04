import { createHash } from 'crypto';

const generatePixShippingId = (loc_id: number, donation_id: string, user_id: string): string => {
    const concatenatedValue = loc_id.toString() + donation_id + user_id;

    const hash = createHash('sha256');
    hash.update(concatenatedValue);
    const hashStr = hash.digest('hex');

    let uniqueValue = hashStr.slice(0, 35);
    while (uniqueValue.length < 35) {
        uniqueValue += '0';
    }

    return uniqueValue;
}

const generateRefundId = (e2eId: string, loc_id: number, donation_id: string, user_id: string): string => {
    const concatenatedValue = e2eId + loc_id.toString() + donation_id + user_id;

    const hash = createHash('sha256');
    hash.update(concatenatedValue);
    const hashStr = hash.digest('hex');

    let uniqueValue = hashStr.slice(0, 35);
    while (uniqueValue.length < 35) {
        uniqueValue += '0';
    }

    return uniqueValue;
}

export { generatePixShippingId, generateRefundId }
