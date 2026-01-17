

const ownerOnly = (req, res, next) => {
    if (req.user.role !== 'OWNER') {
        return res.status(403).json({ message: "Forbidden: Owners only" });
    }   
    next();
};

export default ownerOnly;




