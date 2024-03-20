function timerController(): void {
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let timer = 0;

  self.onmessage = ({ data }) => {
    const { command, time, pausedTime } = data;

    if (command === 'start') {
      timer = time;

      intervalId = setInterval(() => {
        if (timer <= 0 && intervalId) {
          timer = 0;
          clearInterval(intervalId);
        }

        timer -= 1;

        self.postMessage({ timer });
      }, 1000);
    }

    if (command === 'pause' && intervalId) {
      clearInterval(intervalId);
      timer = pausedTime;

      self.postMessage({ timer });
    }
  };
}

let code = timerController.toString();
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

const blob = new Blob([code], { type: 'application/javascript' });

export const workerScript = URL.createObjectURL(blob);
