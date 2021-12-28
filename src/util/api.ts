import { request } from 'graphql-request';

export async function GetData(url, query: any) {
    return await request(url, query)
}