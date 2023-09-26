import db from "../models";

const getGroupWithRoles = async (user) => {
    try {
        let roles = await db.Group.findOne({
            where: {
                id: user.groupId
            },
            include: [{ model: db.Role, attributes: ['id', 'url', 'description'], through: { attributes: [] } }],
            attributes: ['id','name','description']
            
        })
        return roles ? roles : {}
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getGroupWithRoles
}