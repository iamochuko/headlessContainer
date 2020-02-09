import { Logger, Injectable } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

// Decalrative Jobs

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_45_SECONDS) // run every 45secs
  handleCron() {
    this.logger.debug('Called every 45secs');
    console.log('Called every 45secs');
  }

  @Cron(CronExpression.EVERY_30_MINUTES, {name:'Notification'})
  triggerNotification() {
    console.log('Notification fron CRONOS');
  }

  // Intervals
  @Interval('intervalNotification',10000)
  handleInterval() {
    console.log('Notification @ every 10secs');
  }
  
  // timeout
  @Timeout('Timeout Notification',5000)
  handleTimeout() {
    console.log('Timeout Notification @ every 5secs');
  }
}
