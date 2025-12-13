import express from 'express';
import { 
  getAllCoursesHandler, 
  getCourseCountHandler,      
  createCourseHandler, 
  updateCourseHandler,     
  deleteCourseHandler     
} from '../../controllers/admin/coursesController.js';

const router = express.Router();

router.get('/', getAllCoursesHandler);              // Get all courses
router.get('/count', getCourseCountHandler);        // Get total course count
router.post('/', createCourseHandler);              // Add new course
router.put('/:id', updateCourseHandler);            // Edit course by ID
router.delete('/:id', deleteCourseHandler);         // Delete course by ID

export default router;
