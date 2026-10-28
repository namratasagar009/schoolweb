import { storage } from '../data/storage.js';

export const getHomework = (req, res, next) => {
  try {
    const { status } = req.query;
    let homework = storage.getTable('homework') || [];

    if (status) {
      homework = homework.filter(
        (h) => h.status && h.status.toLowerCase() === status.toLowerCase()
      );
    }

    res.json({
      success: true,
      count: homework.length,
      pendingCount: homework.filter((h) => h.status === 'Pending').length,
      data: homework
    });
  } catch (error) {
    next(error);
  }
};

export const submitHomework = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    let found = false;

    const updatedHomework = storage.updateTable('homework', (list) =>
      list.map((h) => {
        if (h.id === id) {
          found = true;
          return {
            ...h,
            status: 'Completed',
            submittedAt: new Date().toISOString()
          };
        }
        return h;
      })
    );

    if (!found) {
      return res.status(404).json({
        success: false,
        message: `Homework with ID ${id} not found`
      });
    }

    res.json({
      success: true,
      message: `Homework ${id} marked as completed`,
      data: updatedHomework.find((h) => h.id === id)
    });
  } catch (error) {
    next(error);
  }
};
