import { storage } from '../data/storage.js';

export const getTimetable = (req, res, next) => {
  try {
    const { day } = req.query;
    const timetable = storage.getTable('timetable');

    if (day) {
      // Case-insensitive day match
      const matchingKey = Object.keys(timetable).find(
        (k) => k.toLowerCase() === day.toLowerCase()
      );

      if (!matchingKey) {
        return res.status(404).json({
          success: false,
          message: `No timetable found for day: ${day}. Available days: ${Object.keys(timetable).join(', ')}`
        });
      }

      return res.json({
        success: true,
        day: matchingKey,
        data: timetable[matchingKey]
      });
    }

    res.json({
      success: true,
      data: timetable
    });
  } catch (error) {
    next(error);
  }
};
