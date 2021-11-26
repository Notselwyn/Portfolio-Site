import { list } from '@keystone-next/keystone';
import { integer, text, timestamp, relationship } from '@keystone-next/keystone/fields';

export const lists = {
    Post: list({
        fields: {
            id: integer({ validation: { isRequired: true} }),
            title: text({ validation: { isRequired: true } }),
            content: text({ validation: { isRequired: true } }),
            bannerUrl: text({ validation: { isRequired: true } }),
            createdAt: timestamp({ validation: { isRequired: true } }),
            author: relationship({ ref: 'Author.posts', many: false }),
        }
    }),
    Author: list({
        fields: {
            id: integer({ validation: { isRequired: true} }),
            name: text({ validation: { isRequired: true } }),
            email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
            createdAt: timestamp({ validation: { isRequired: true } }),
            posts: relationship({ ref: 'Post.author', many: true }),
        },
    }),
};