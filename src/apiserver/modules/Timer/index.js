import redisClient from '../../../config/redisConnect';


/* This manages the global timer that releases new messages.
 * Really, this should be set on the database? At least have separate timers per 'room'.
 * But since we don't have rooms, we don't need that.
 */
let instance = null;

class TrancheTimer {
  constructor(timeSpread = 5, triggeredCallback, updateTimeCallback) {
    // If we are a singleton and already registered, return that.
    if (instance) {
      return instance;
    }
    // Set up callbacks and settings
    this.ringCallback = triggeredCallback;
    this.tickTockCallback = updateTimeCallback;
    this.timeSpreadMinutes = timeSpread;
    this.updateTick = 5000; // milliseconds

    // Set up last time
    this.lastTimestamp = redisClient.get('lastTranche');
    if (!this.lastTime) {
      this.setLastTimeToNow();
    }
    this.runner = setInterval(this.tickTock.bind(this), this.updateTick);
    instance = this;
  }

  setLastTimeToNow() {
    this.lastTimestamp = Date.now();
    redisClient.set('lastTranche', this.lastTimestamp);
  }

  tickTock() {
    const boost = this.timeSpreadMinutes * 60000;
    const triggerTimestamp = this.lastTimestamp + boost;
    const nowTimestamp = Date.now();
    if (triggerTimestamp < nowTimestamp) {
      this.ringCallback(this.lastTimestamp);
      this.setLastTimeToNow();
    }
    this.tickTockCallback(nowTimestamp, triggerTimestamp);
  }
}

export default TrancheTimer;
