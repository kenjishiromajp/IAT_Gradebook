import { denormalize, normalize, schema } from 'normalizr';

const userSchema = new schema.Entity('users');
const userListSchema = [userSchema];

export const normalizeUsers = (data) => normalize(data, userListSchema);

export const denormalizeUsers = (data, entities) => {
  const newEntities = entities || { users: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    userListSchema,
    newEntities
  );
  return denormalizedData || [];
};
