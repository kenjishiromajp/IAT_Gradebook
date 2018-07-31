import { normalize, schema } from 'normalizr';

const postSchema = new schema.Entity('posts');
const postListSchema = [postSchema];

const normalizePosts = (data) => normalize(data, postListSchema);

export default normalizePosts;
