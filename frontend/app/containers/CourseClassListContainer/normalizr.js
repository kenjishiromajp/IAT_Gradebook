import moment from 'moment';
import { denormalize, normalize, schema } from 'normalizr';

const courseClassSchema = new schema.Entity('courseClass');
const courseClassListSchema = [courseClassSchema];

const formatData = (courseClasses) =>
  courseClasses.map((courseClass) => {
    let newCourseClass = courseClass;
    if (courseClass.startDate) {
      newCourseClass = {
        ...newCourseClass,
        startDate: moment(newCourseClass.startDate),
      };
    }
    if (courseClass.endDate) {
      newCourseClass = {
        ...newCourseClass,
        endDate: moment(newCourseClass.endDate),
      };
    }
    return newCourseClass;
  });

export const normalizeCourseClass = (data) => normalize(formatData(data), courseClassListSchema);

export const denormalizeCourseClass = (data, entities) => {
  const newEntities = entities || { courseClass: data };
  const denormalizedData = denormalize(
    Object.keys(data),
    courseClassListSchema,
    newEntities
  );
  return denormalizedData || [];
};
