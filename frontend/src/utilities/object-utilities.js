import {cloneDeep} from "lodash";

/**
 * Deep clones an object and returns a new project with all original properties
 * and updated properties.
 * @param {Object} oldObject
 * @param {Object} updatedProperties
 * @returns {Object}
 */
const updateObject = (oldObject, updatedProperties) => {
  const oldObjectCopy = cloneDeep(oldObject);

  return {
    ...oldObjectCopy,
    ...updatedProperties,
  };
};

export {updateObject};
