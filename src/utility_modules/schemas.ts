//import { list } from '@keystone-next/keystone';
//import { document, text, timestamp, password, relationship } from '@keystone-next/keystone/fields';
//
//export const lists = {
//  Post: list({
//    fields: {
//      title: text({ validation: { isRequired: true } }),
//      content: document(),
//      publishDate: timestamp(),
//      author: relationship({ ref: 'Author.posts', many: false }),
//    },
//  }),
//  Author: list({
//    fields: {
//      name: text({ validation: { isRequired: true } }),
//      email: text({ isIndexed: 'unique', validation: { isRequired: true } }),
//      password: password(),
//      posts: relationship({ ref: 'Post.author', many: true }),
//    },
//  }),
//};