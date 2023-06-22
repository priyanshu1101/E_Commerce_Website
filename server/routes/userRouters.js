import express from "express";
import { deleteUser, forgotPassword, getAllUsers, getSingleUser, getUserDetails, googleAuth, loginUser, logoutUser, registerUser, resetPassword, updatePassword, updateProfile, updateUserRole } from "../controllers/userController.js";
import { authrizeRole, isAuthenticatedUser } from "../middleware/auth.js";
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/googleAuth', googleAuth);
router.get('/logout', logoutUser);
router.post('/password/forgot', forgotPassword);
router.put('/password/reset/:token', resetPassword);
router.put('/password/update', isAuthenticatedUser, updatePassword)
router.get('/profile', isAuthenticatedUser, getUserDetails);
router.put("/profile/update", isAuthenticatedUser, updateProfile);

router.route('/admin/users')
    .get(isAuthenticatedUser, authrizeRole(["admin"]), getAllUsers)
router.route('/admin/user/:id')
    .get(isAuthenticatedUser, authrizeRole(["admin"]), getSingleUser)
    .put(isAuthenticatedUser, authrizeRole(['admin']), updateUserRole)
    .delete(isAuthenticatedUser, authrizeRole(['admin']), deleteUser)


export default router;