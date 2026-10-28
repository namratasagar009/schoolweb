import { storage } from '../data/storage.js';

export const getAssemblies = (req, res, next) => {
  try {
    const assemblies = storage.getTable('assemblies');
    res.json({
      success: true,
      data: assemblies
    });
  } catch (error) {
    next(error);
  }
};
