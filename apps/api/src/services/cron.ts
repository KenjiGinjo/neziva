class CronService {
  private intervals: Map<string, NodeJS.Timeout> = new Map()
  private isRunning = false

  start() {
    if (this.isRunning) {
      return
    }

    this.isRunning = true

    // const notificationInterval = setInterval(async () => {
    //   try {
    //     console.log('[CRON] Running notification system event handler...')
    //     // await ds.notification.runHandleSystemEvent()
    //   }
    //   catch (error) {
    //     console.error('[CRON] Notification system event handler failed:', error)
    //   }
    // }, 60 * 1000) // 60秒

    // this.intervals.set('notification', notificationInterval)
  }

  stop() {
    this.intervals.forEach((interval) => {
      clearInterval(interval)
    })
    this.intervals.clear()
    this.isRunning = false
  }

  getStatus() {
    return {
      isRunning: this.isRunning,
      activeJobs: Array.from(this.intervals.keys()),
    }
  }
}

export const cronService = new CronService()
