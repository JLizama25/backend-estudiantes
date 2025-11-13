const express = require('express');
const router = express.Router();
const estudiantesController = require('../controllers/estudiantesController');
const auth = require('../middlewares/authMiddleware');

router.get('/', auth, estudiantesController.listar);
router.post('/', auth, estudiantesController.crear);
router.put('/:id', auth, estudiantesController.actualizar);
router.delete('/:id', auth, estudiantesController.eliminar);

module.exports = router;
