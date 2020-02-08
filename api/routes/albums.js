import { Router } from 'express';
const router = Router();
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GEt requests to albums'
    });
});
router.get('/:albumId', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GEt requests to albums'
    });
});
router.post('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling post requests to albums'
    });
});
export default router;