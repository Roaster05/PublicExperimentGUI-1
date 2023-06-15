console.log("Monitoring started");

function monitor() {
  const interval = 5000; // 5 seconds

  setInterval(() => {
    const now = new Date();
    console.log(`Current time is: ${now.toLocaleString()}`);
  }, interval);
}

monitor();
