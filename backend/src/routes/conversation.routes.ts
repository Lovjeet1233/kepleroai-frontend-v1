import { Router } from 'express';
import { conversationController } from '../controllers/conversation.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate); // All routes require authentication

router.get('/', conversationController.getAll);
router.get('/search-messages', conversationController.searchMessages);
router.get('/:conversationId', conversationController.getById);
router.post('/:conversationId/messages', conversationController.addMessage);
router.post('/:conversationId/take-control', conversationController.takeControl);
router.post('/:conversationId/release-control', conversationController.releaseControl);
router.patch('/:conversationId/status', conversationController.updateStatus);
router.patch('/:conversationId/assign', conversationController.assignOperator);
router.patch('/:conversationId/labels', conversationController.updateLabels);
router.patch('/:conversationId/folder', conversationController.moveToFolder);
router.delete('/:conversationId', conversationController.delete);
router.post('/bulk-delete', conversationController.bulkDelete);

export default router;
