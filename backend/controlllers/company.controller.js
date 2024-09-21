import {Company} from "../models/company.nodel.js";

export const registerCompany = async (req, res) => {
    try {
        const {companyName} = req.body;
        if (!companyName) {
            return res.status(400).json({
                message:"Company Name is required",
                success: false
            });
        }
        let company = await Company.findOne({name:companyName});
        if (company) {
            return res.status(400).json({
                message:"you can't register same company",
                success:false
            });
        }
        company = await Company.create({
            name:companyName,
            userId:req.id
        });
        return res.status(201).json({
            message:"Company registered successfully",
            success:false
        });
    } catch (error) {
        return res.status(400).json({
            message:"Error occured while registering company",
            success:false
        });
    }
}

export const getCompany = async (req,res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({userId});
        if (!companies) {
            return res.status(404).json({
                message:"Companies not found",
                success:false
            });
        }
        return res.status(200).json({
            companies,
            success:true
        });
        
    } catch (error) {
        return res.status(400).json({
            message:"Error occured while fetching companies",
            success:false
        });
    }
}
export const getCompanyById = async (req,res) => {
    try {
        const companyId = req.params.id;
        const comapny = await Company.findById(companyId);
        if (!comapny) {
            return res.status(400).json({
                message:"Company not found",
                success:true
            });
        }
        return res.status(200).json({
            comapny,
            success:true
        });

    } catch (error) {
        return res.status(400).json({
            message:"Error occured while fetching company",
            success:false
        });
    }
}
export const updateCompany = async (req,res) => {
    try {
        const {name, description, website, location} = req.body;
        const file = req.file;
        // cloudinary

        const updateData = {name, description, website, location };
        const company = await Company.findByIdAndUpdate(req.params.id,updateData, {new: true});
        if (!company) {
            return res.status(404).json({
                message:"Company not found",
                success:false
            });
        }
        return res.status(200).json({
            message:"company information updated",
            success:true
        });

    } catch (error) {
        return res.status(400).json({
            message:"Error occured while updating company details",
            success: false
        });
    }
}
