import { post } from '../axios/axios-client';
import { PINATA_BASE_URL, PINATA_JSON_UPLOAD, PINATA_GATEWAY } from '../../utils/constants';

export const pinJson = async (jsonBody: string) => {
    try {
        const url = PINATA_BASE_URL + PINATA_JSON_UPLOAD;
        const result = await post(url, jsonBody);

        return PINATA_GATEWAY + result;
    } catch (error) {
        console.log(`[exception occurred while posting json] ${error}`);
    }
}