import { normalize, schema } from 'normalizr';

const loginPageSchema = new schema.Entity('loginPages');
const loginPageListSchema = [loginPageSchema];

const normalizeLoginPages = (data) => normalize(data, loginPageListSchema);

export default normalizeLoginPages;
