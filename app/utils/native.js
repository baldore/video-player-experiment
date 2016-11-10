/**
 * @param {File} file
 * @returns {Promise} Resolves to a object with information about the resource
 * if the load was success, or is rejected with an error.
 */
export function getDataFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    // TODO: This should resolve with more information about the resource
    reader.onload = function onResourceLoad(event) {
      resolve(event.target.result);
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}
