import { storage } from '../data/storage.js';

export const getNotices = (req, res, next) => {
  try {
    const { category, search } = req.query;
    let notices = storage.getTable('notices') || [];

    if (category && category.toLowerCase() !== 'all') {
      notices = notices.filter(
        (n) => n.category && n.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      notices = notices.filter(
        (n) =>
          (n.title && n.title.toLowerCase().includes(q)) ||
          (n.content && n.content.toLowerCase().includes(q))
      );
    }

    res.json({
      success: true,
      count: notices.length,
      unreadCount: notices.filter((n) => !n.read).length,
      data: notices
    });
  } catch (error) {
    next(error);
  }
};

export const getNoticeById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    const notices = storage.getTable('notices') || [];
    const notice = notices.find((n) => n.id === id);

    if (!notice) {
      return res.status(404).json({
        success: false,
        message: `Notice with ID ${id} not found`
      });
    }

    res.json({
      success: true,
      data: notice
    });
  } catch (error) {
    next(error);
  }
};

export const markNoticeRead = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);
    let found = false;

    const updatedNotices = storage.updateTable('notices', (notices) =>
      notices.map((n) => {
        if (n.id === id) {
          found = true;
          return { ...n, read: true };
        }
        return n;
      })
    );

    if (!found) {
      return res.status(404).json({
        success: false,
        message: `Notice with ID ${id} not found`
      });
    }

    res.json({
      success: true,
      message: `Notice ${id} marked as read`,
      data: updatedNotices.find((n) => n.id === id)
    });
  } catch (error) {
    next(error);
  }
};

export const markAllNoticesRead = (req, res, next) => {
  try {
    const updatedNotices = storage.updateTable('notices', (notices) =>
      notices.map((n) => ({ ...n, read: true }))
    );

    res.json({
      success: true,
      message: 'All notices marked as read',
      unreadCount: 0,
      data: updatedNotices
    });
  } catch (error) {
    next(error);
  }
};

export const createNotice = (req, res, next) => {
  try {
    const { title, category, content, isHighPriority, icon, hasActionButton, actionText } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: 'Title and content are required'
      });
    }

    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
    const timeStr = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    let newNotice;

    const updatedNotices = storage.updateTable('notices', (notices) => {
      const maxId = notices.reduce((max, n) => (n.id > max ? n.id : max), 0);
      newNotice = {
        id: maxId + 1,
        title,
        category: category || 'Academic',
        isHighPriority: Boolean(isHighPriority),
        date: dateStr,
        time: timeStr,
        icon: icon || 'notifications',
        content,
        hasActionButton: Boolean(hasActionButton),
        actionText: actionText || undefined,
        read: false
      };
      return [newNotice, ...notices];
    });

    res.status(201).json({
      success: true,
      message: 'Notice created successfully',
      data: newNotice
    });
  } catch (error) {
    next(error);
  }
};
