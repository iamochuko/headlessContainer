import {
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  HttpException,
  ForbiddenException,
  Body,
  CacheKey,
  CacheTTL,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SchedulerRegistry, Cron } from '@nestjs/schedule';
import { CronJob } from 'cron';

import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private scheduler: SchedulerRegistry,
  ) {}

  @CacheKey('appCtrl')
  @CacheTTL(20)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @UseGuards - This Guard uses the Passport-local strategy and kicks off the
  // steps of retrieving credentials, running the verify function, creating the user property, etc.
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    try {
      const res = await this.authService.login(req.user);
      return res ? res : { err: 'Not Authorised!' };
    } catch (err) {
      throw new HttpException('Bad Response', 302);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async profile(@Request() req: any) {
    try {
      if (req.user) {
        return req.user;
      }
      throw new ForbiddenException();
    } catch (error) {
      throw new HttpException('Bad Response', 302);
    }
  }

  /* Task Sceduler */

  // check with scheduler
  getCronJob(name: string) {
    const job = this.scheduler.getCronJob(name);
    job.stop();
    console.log('job:', job.lastDate());
  }

  // setting up a dynamic CronJob schedule
  addCronJob(name: string, seconds: string) {
    const job = new CronJob(`${seconds} * * * * *`, () => {
      console.warn(`time (${seconds}) for job ${name} to run!`);
    });

    this.scheduler.addCronJob(name, job);
    job.start();
    console.warn(`Job name ${name} add for each minute at ${seconds} seconds!`);
  }

  // delete CronJob
  deleteCronJob(name: string) {
    this.scheduler.deleteCronJob(name);
    console.warn(`Job name ${name} deleted!`);
  }

  // list all CronJobs
  listCronJobs() {
    const jobs = this.scheduler.getCronJobs();

    jobs.forEach((val, key) => {
      let next;
      try {
        next = val.nextDates().toDate();
      } catch (err) {
        next = 'Error: next fire date is in the past';
      }
      console.warn(`Job: ${key} -> next: ${next}!`);
    });
  }

  // get Dynamic Schedule Interval
  clearScheduleInterval(name: string) {
    clearInterval(this.scheduler.getInterval(name));
  }

  // Create a new interval dynamically
  addScheduleInterval(name: string, secs: number) {
    const cb = () =>
      console.warn(`Interval ${name} executing at time:${secs}!`);
    this.scheduler.addInterval(name, setInterval(cb, secs));
  }
}
