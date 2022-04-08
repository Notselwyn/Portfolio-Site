import { request } from 'graphql-request';

export async function getData(url, query: any) {
    return await request(url, query)
}