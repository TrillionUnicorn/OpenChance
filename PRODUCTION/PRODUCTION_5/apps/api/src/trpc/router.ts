import { router } from './trpc';
import { authRouter } from '../routes/auth';
import { userRouter } from '../routes/user';
import { challengeRouter } from '../routes/challenge';
import { applicationRouter } from '../routes/application';
import { messageRouter } from '../routes/message';
import { paymentRouter } from '../routes/payment';
import { reviewRouter } from '../routes/review';
import { notificationRouter } from '../routes/notification';
import { searchRouter } from '../routes/search';
import { adminRouter } from '../routes/admin';

/**
 * Main application router
 * Combines all feature routers
 */
export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  challenge: challengeRouter,
  application: applicationRouter,
  message: messageRouter,
  payment: paymentRouter,
  review: reviewRouter,
  notification: notificationRouter,
  search: searchRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;

