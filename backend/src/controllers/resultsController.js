import { storage } from '../data/storage.js';

export const getResults = (req, res, next) => {
  try {
    const results = storage.getTable('results');
    res.json({
      success: true,
      data: results
    });
  } catch (error) {
    next(error);
  }
};
