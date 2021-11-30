import { Router } from 'express';
import { body } from 'express-validator';
import { signIn, signUp, authUser } from '../controllers';
import isAuthenticated from '../middlewares/is-Authenticated';
import { validateRequest } from '../middlewares/validate-request';

const router = Router();

// signup route
router.post(
  '/signup',
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 4, max: 24 })
    .withMessage('Ensure password is between 4 and 24 characters'),
  validateRequest,
  signUp
);
// signin route
router.post('/signin', signIn);

// get auth user
router.get('/auth-user', isAuthenticated, authUser);
// router.get('/auth-user', isAuthenticated, authUser);

export default router;
