const express = require('express');
const router = express.Router();
const imageController = require('../Controller/imageController');

router.route('/length').get(imageController.length);

router.route('/all').get(imageController.getAllImages);

router.route('/').get(imageController.pagination);

router.route('/:id').get(imageController.getOneImage);

router.route('/:id/edit').patch(imageController.editCurrentImage);

router.route('/new-image').post(imageController.addNewImage);

router.route('/:id/delete').delete(imageController.deleteCurrentImage);

router.route('/search').post(imageController.searchedImage);

module.exports = router;
