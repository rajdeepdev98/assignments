function myCounter() {
  process.stdout.write(new Date().toLocaleTimeString() + "\r");
  setTimeout(myCounter, 1000);
}
myCounter();
