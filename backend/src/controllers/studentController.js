import { storage } from '../data/storage.js';

export const getStudentProfile = (req, res, next) => {
  try {
    const student = storage.getTable('student');
    res.json({
      success: true,
      data: student
    });
  } catch (error) {
    next(error);
  }
};

export const updateStudentProfile = (req, res, next) => {
  try {
    const updates = req.body;
    const updatedStudent = storage.updateTable('student', (current) => ({
      ...current,
      ...updates
    }));

    res.json({
      success: true,
      message: 'Student profile updated successfully',
      data: updatedStudent
    });
  } catch (error) {
    next(error);
  }
};
