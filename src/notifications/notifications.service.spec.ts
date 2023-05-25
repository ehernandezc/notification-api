import { Test } from '@nestjs/testing';
import { NotificationService } from './notification.service';
import { NotificationFactory } from './notification.factory';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { Notification } from './notifications.entity';

describe('NotificationService', () => {
  let notificationService: NotificationService;
  let notificationFactory: NotificationFactory;
  let userRepository: Repository<User>;
  let notificationRepository: Repository<Notification>;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        NotificationService,
        NotificationFactory,
        {
          provide: 'UserRepository',
          useClass: Repository,
        },
        {
          provide: 'NotificationRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    notificationService = moduleRef.get<NotificationService>(NotificationService);
    notificationFactory = moduleRef.get<NotificationFactory>(NotificationFactory);
    userRepository = moduleRef.get<Repository<User>>('UserRepository');
    notificationRepository = moduleRef.get<Repository<Notification>>('NotificationRepository');
  });

  describe('sendNotification', () => {
    it('should send notifications to users subscribed to the specified category', async () => {
      const categoryId = 1;
      const message = 'Test message';
      const usersToNotify = [
        {
          id: 1,
          channels: [{ id: 1, name: 'SMS' }],
          subscribedCategories: [{ id: 1, name: 'Category 1' }],
        },
        {
          id: 2,
          channels: [{ id: 2, name: 'Email' }],
          subscribedCategories: [{ id: 1, name: 'Category 1' }],
        },
      ];

      jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue({
        innerJoin: jest.fn().mockReturnThis(),
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(usersToNotify),
      } as any);

      const totalCount = 2;
      const notifications = [{ 
        id: 1,
        message: 'test message 1',
        categoryId: 1,
        channelId: 1,
        userId: 1,
      },
      { 
        id: 2,
        message: 'test message 2',
        categoryId: 2,
        channelId: 2,
        userId: 2,
      }];

      jest.spyOn(notificationRepository, 'count').mockResolvedValue(totalCount);

      const queryBuilder = {
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(notifications),
      };

      jest.spyOn(notificationRepository, 'createQueryBuilder').mockReturnValue(queryBuilder as any);

      const sendSpy = jest.spyOn(notificationFactory, 'createNotification').mockReturnValue({
        send: jest.fn().mockReturnValue(true),
      } as any);

      const saveSpy = jest.spyOn(notificationRepository, 'save').mockResolvedValue({ categoryId: 1, message: 'test', channelId: 1, userId: 1, id: 1, createdAt: '', user: null, channel: null, category: null });

      const result = await notificationService.sendNotification(categoryId, message);

      expect(sendSpy).toHaveBeenCalledTimes(2);
      expect(saveSpy).toHaveBeenCalledTimes(2);
      expect(result).toEqual({ totalCount: notifications.length, data: notifications });
    });
  });

  describe('getNotifications', () => {
    it('should return paginated notifications with total count', async () => {
      const offset = 0;
      const limit = 5;
      const totalCount = 100;
      const notifications = [{ 
          id: 1,
          message: 'test message 1',
          categoryId: 1,
          channelId: 1,
          userId: 1,
        },
        { 
          id: 2,
          message: 'test message 2',
          categoryId: 2,
          channelId: 3,
          userId: 2,
        },
        { 
          id: 3,
          message: 'test message 3',
          categoryId: 3,
          channelId: 1,
          userId: 3,
        },
        { 
          id: 4,
          message: 'test message 4',
          categoryId: 3,
          channelId: 2,
          userId: 4,
        },
        { 
          id: 5,
          message: 'test message 5',
          categoryId: 3,
          channelId: 2,
          userId: 3,
        },
      ];

      jest.spyOn(notificationRepository, 'count').mockResolvedValue(totalCount);

      const queryBuilder = {
        innerJoinAndSelect: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(notifications),
      };

      jest.spyOn(notificationRepository, 'createQueryBuilder').mockReturnValue(queryBuilder as any);

      const result = await notificationService.getNotifications(offset, limit);

      expect(queryBuilder.skip).toHaveBeenCalledWith(offset);
      expect(queryBuilder.take).toHaveBeenCalledWith(limit);
      expect(queryBuilder.getMany).toHaveBeenCalled();
      expect(result).toEqual({ totalCount, data: notifications });
    });
  });
});
