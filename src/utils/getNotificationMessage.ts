export function getNotificationMessage(state: string) {
  let title = '';
  let body = '';

  switch (true) {
    case state === 'pomodoro':
      title = 'Pomodoro Session Completed! 🍅';
      body = 'Congratulations on completing a productive pomodoro session! Take a break and relax.';
      break;
    case state === 'shortBreak':
      title = 'Short Break Completed! ☕';
      body = 'Well done on your short break! Ready to tackle tasks with a fresh perspective?';
      break;
    case state === 'longBreak':
      title = 'Long Break Completed! 🌴';
      body = 'Enjoyed your long break? Get ready to return refreshed and ready for new challenges!';
      break;
  }

  return { title, body };
}
