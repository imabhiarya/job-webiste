import { User } from '../models/user.model.js';

const isRecruter = async (req, res, next) => {
    try {
        const userId = req.id;
        if (!userId) {
            return res.status(400).json({
                message:"user id not found",
                success: false
            });
        }

        const user = await User.findById(userId);
        const role = user.role;
        if (role === "student") {
            return res.status(400).json({
                message:"Only recruiter can post job",
                success:false
            });
        }
        
        next();


    } catch (error) {
        console.log(error);
        
    }
}
export default isRecruter;