import { storage } from '../data/storage.js';

export const getSubjects = (req, res, next) => {
  try {
    const { type } = req.query;
    let subjects = storage.getTable('subjects') || [];

    if (type && type.toLowerCase() !== 'all') {
      subjects = subjects.filter(
        (s) => s.type && s.type.toLowerCase() === type.toLowerCase()
      );
    }

    res.json({
      success: true,
      count: subjects.length,
      data: subjects
    });
  } catch (error) {
    next(error);
  }
};

export const getSubjectById = (req, res, next) => {
  try {
    const { id } = req.params;
    const subjects = storage.getTable('subjects') || [];
    const subject = subjects.find(
      (s) => s.id.toLowerCase() === id.toLowerCase()
    );

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: `Subject '${id}' not found`
      });
    }

    res.json({
      success: true,
      data: subject
    });
  } catch (error) {
    next(error);
  }
};
