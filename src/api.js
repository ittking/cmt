/* eslint-disable no-useless-escape */
import http from "./http";
import _ from "lodash";

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

/**
 * 翻译代码块
 * @param {Array} list 指标树
 * @param {String} value 代码块
 * @returns String
 */
export const translateCode = (list, value) => {
  const fields = [];
  let params = value.match(/[\u4e00-\u9fa5\（\）]+\.[\u4e00-\u9fa5\（\）]+/g);
  if (params && params.length) {
    _.each(params, param => {
      const item = param.split(".");
      if (item && item.length === 2) {
        fields.push(item);
      } else {
        console.warn("公式翻译错误～");
        return "公式格式错误，请检查正确后，再翻译！";
      }
    });
  } else {
    return value;
  }
  const dictionary = [];
  applyTree(list, dictionary);
  _.each(fields, field => {
    if (field.length) {
      const code = field.map(f => {
        const one = _.find(dictionary, d => d.title === f);
        return one && one.key;
      }).join(".");
      // eslint-disable-next-line no-eval
      value = value.replace(eval(`/~${field.join(".")}~/g`), code);
    }
  });
  return value;
}

/**
 * 获取字典表
 * @param {Array} list 
 */
function applyTree(list, dictionary = []) {
  _.each(list, each => {
    if (each.children) {
      // eslint-disable-next-line no-unused-vars
      applyTree(each.children, dictionary);
    }
    if (each.setid && each.typeid) {
      dictionary.push({ key: each.typeid, title: each.description });
    }
    if (each.FieldName) {
      dictionary.push({ key: each.FieldName, title: each.description });
    }
  });
}