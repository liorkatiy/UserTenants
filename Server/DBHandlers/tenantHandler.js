const tenantModel = require("../DBmodels/tenantModels");

async function get(id) {
  const query = id ? {
    _id: id
  } : {};
  let result = await tenantModel.find(query);
  return result;
}

/**
 * 
 * @param {{name:string,phoneNumber:string,address:string,financialDebt:string}} tenant 
 */
async function create(tenant) {
  try {
    const result = await tenantModel.create(tenant);
    return result;
  } catch (e) {
    return false;
  }
}

/**
 * 
 * @param {{name:string,phoneNumber:string,address:string,financialDebt:string}} tenant 
 * @param {string} id
 */
async function update(id, tenant) {
  try {
    let result = await tenantModel.update({
      _id: id
    }, tenant);
    return result;
  } catch (e) {
    return false;
  }
}

async function remove(id) {
  try {
    let result = await tenantModel.remove({
      _id: id
    });
    return result;
  } catch (e) {
    return false;
  }
}

module.exports = {
  create,
  remove,
  update,
  get,
};