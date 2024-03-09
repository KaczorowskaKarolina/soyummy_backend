import { Router } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import { serve, setup } from 'swagger-ui-express';
import { specs, swaggerConfig } from '../../config/index.js';
import user from './user.js';
import category from './category.js';
import recipe from './recipe.js';
import ingredient from './ingredient.js';
const router = Router();

const specDoc = swaggerJsdoc(swaggerConfig);

router.use(specs, serve);
router.get(specs, setup(specDoc, { explorer: true }));

router.use('/user', user);
router.use('/category', category);
router.use('/recipe', recipe);
router.use('/ingredient', ingredient);

export default router;
