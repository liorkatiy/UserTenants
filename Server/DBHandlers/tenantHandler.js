const tenantModel = require("../DBmodels/tenantModels");

async function get(search) {
  try {
    const query = search ? {
      "name": {
        $regex: ".*" + search + ".*"
      }
    } : {};
    let result = await tenantModel.find(query);
    return result;
  } catch (e) {
    return {
      error: e
    };
  }
}

/**
 * 
 * @param {{name:string,phoneNumber:string,address:string,financialDebt:string}} tenant 
 */
async function create(tenant) {
  try {
    tenant._id = undefined;
    const result = await tenantModel.create(tenant);
    return result;
  } catch (e) {
    return {
      error: e
    };
  }
}

/**
 * 
 * @param {{id:string,name:string,phoneNumber:string,address:string,financialDebt:string}} tenant 
 * @param {string} id
 */
async function update(tenant) {
  try {
    let result = await tenantModel.update({
      _id: tenant.id
    }, tenant);
    return result.n > 0;
  } catch (e) {
    return {
      error: e
    };
  }
}

async function remove(id) {
  try {
    let result = await tenantModel.remove({
      _id: id
    });
    return result.n > 0;
  } catch (e) {
    return {
      error: e
    };
  }
}

module.exports = {
  create,
  remove,
  update,
  get,
};