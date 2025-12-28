// src/utils/deadlineScheduler.ts
import { notify, scheduleNotification, cancelNotification } from './notify';

interface Task {
  _id: string;
  title: string;
  dueAt?: string | Date;
  completed?: boolean;
  customReminderMessage?: string;
}

// Map to track scheduled notification IDs
const scheduledNotifications = new Map<string, string>();

/**
 * Schedule a deadline notification for a task
 */
export async function scheduleDeadline(task: Task): Promise<void> {
  if (!task.dueAt || task.completed) return;

  const dueTime = new Date(task.dueAt).getTime();
  const now = Date.now();
  const delay = dueTime - now;

  if (delay <= 0) return;

  // Clear existing notification for this task
  await clearDeadline(task._id);

  // Schedule notification at deadline
  const notificationId = await scheduleNotification(
    '⏰ Task Deadline',
    task.customReminderMessage || `"${task.title}" is due now. Start immediately.`,
    new Date(task.dueAt)
  );

  if (notificationId) {
    scheduledNotifications.set(task._id, notificationId);
  }

  // Also schedule a 30-minute warning if deadline is more than 30 mins away
  if (delay > 30 * 60 * 1000) {
    const warningTime = new Date(dueTime - 30 * 60 * 1000);
    await scheduleNotification(
      '⏰ Deadline approaching',
      task.customReminderMessage || `"${task.title}" is due in 30 minutes.`,
      warningTime
    );
  }
}

/**
 * Clear a scheduled deadline notification
 */
export async function clearDeadline(taskId: string): Promise<void> {
  const notificationId = scheduledNotifications.get(taskId);
  if (notificationId) {
    await cancelNotification(notificationId);
    scheduledNotifications.delete(taskId);
  }
}

/**
 * Schedule deadlines for multiple tasks
 */
export async function scheduleAllDeadlines(tasks: Task[]): Promise<void> {
  for (const task of tasks) {
    if (task.dueAt && !task.completed) {
      await scheduleDeadline(task);
    }
  }
}

/**
 * Clear all scheduled deadline notifications
 */
export async function clearAllDeadlines(): Promise<void> {
  for (const [taskId] of scheduledNotifications) {
    await clearDeadline(taskId);
  }
}