import DataLoader from 'dataloader';
import PDVModel from '../models/PDV';

function getPDVsBatch(keys, field) {
  return new Promise((fulfill, reject) => {
    const query = {};
    query[field] = { $in: keys };

    return PDVModel.find(query, (err, docs) => {
      if (err) {
        reject(err);
      }

      const results = [];

      docs.forEach((doc) => {
        results.push(doc);
      });

      fulfill(results);
    });
  });
}

function getPDVsIdsBatch(keys) {
  return getPDVsBatch(keys, 'id');
}

function getPDVsTitlesBatch(keys) {
  return getPDVsBatch(keys, 'title');
}

function getAllPDVsBatch(keys) {
  return getPDVsBatch(keys, '{}');
}

const PDVLoaders = {
  pdvs: new DataLoader(keys => getAllPDVsBatch(keys)),
};

export default PDVLoaders;
