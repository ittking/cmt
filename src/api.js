import http from "./http";

/**
 * 获取类别指标树
 * @returns Array
 */
export const getTypePoinList = () => {
  return new Promise((resolve, reject) => {
    http({
      method: "POST",
      url: "/api/toolbox/srbuiltcollect/listAllBuildSetTree",
      headers: {
        "Content-Type": "application/json"
      },
    }).then(res => {
      if (res && res.data) {
        resolve(res.data);
      }
    }).catch(err => {
      reject(err);
    });
  })
}

/**
 * 获取类别
 * @returns Array
 */
export const getTypes = () => {
  return new Promise((resolve, reject) => {
    http({
      url: "/api/toolbox/srsourcecollect/findSrSourcecollectCategory"
    }).then(res => {
      if (res && res.data) {
        resolve(res.data);
      }
    }).catch(err => {
      reject(err);
    });
  });
}

/**
 * 获取类别详情
 * @param {String} typeid 类别ID
 * @returns Promise
 */
export const getTypeDetail = (typeid) => {
  return new Promise((resolve, reject) => {
    http({
      url: `/api/toolbox/srsourcecollect/findSrSourcecollectBytype/${typeid}`
    }).then(res => {
      if (res && res.data) {
        resolve(res.data);
      }
    }).catch(err => {
      reject(err);
    });
  })
}

/**
 * 获取指标列表
 * @param {String} id
 * @returns 
 */
export const getPointList = (id) => {
  return new Promise((resolve, reject) => {
    http({
      url: `/api/toolbox/srbuiltcollect/findBuildCollectList/${id}`
    }).then(res => {
      if (res && res.data) {
        resolve(res.data);
      }
    }).catch(err => {
      reject(err);
    });
  });
}

/**
 * 获取指标详情
 * @param {String} typeid
 * @param {String} setid
 * @returns 
 */
export const getPointDetail = (typeid, setid) => {
  return new Promise((resolve, reject) => {
    http({
      method: "POST",
      url: "/api/toolbox/srbuiltitem/findSrBuildItemList",
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({ typeid, setid })
    }).then(res => {
      if (res && res.data) {
        resolve(res.data);
      }
    }).catch(err => {
      reject(err);
    });
  });
}

/**
 * 获取运算符
 * @returns Array
 */
export const getOptionsTree = () => {
  return new Promise((resolve, reject) => {
    http({
      method: "POST",
      url: "/api/toolbox/stformula/listFormulaOperationsTree"
    }).then(res => {
      if (res && res.data) {
        resolve(res.data);
      }
    }).catch(err => {
      reject(err);
    });
  });
}