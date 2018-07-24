const PropertiesFilePath = "./properties.ini";

const Headers = "Access-Control-Allow-Origin,Access-Control-Allow-Headers,X-Requested-With,X-Auth-Token,Content-Type, Content-Length, Origin,Accept, Access-Control-Request-Method, Access-Control-Request-Headers";

//All Query Services
const getDistinctThreadURL          = "/getDistinctThreads";
const getClassNameURL               = "/getClassName/:threadName";
const getDistinctLogTypeURL         = "/getDistinctLogType";
const getMethodNameURL              = "/getMethodName/:threadName";
const getDocumentOnThreadNameURL    = "/getDocumentOnThreadName/:threadname";
const getThreadBetweenRangeURL      = "/getThreadBetweenRange";

//User Management 
const getUserListURL                = "/getUserList";
const deleteUserDataURL             = "/deleteUserData/:userId";
const createUserDataURL             = "/createUserData";
const updateUserDataURL             = "/updateUserData";

//Role Management 
const getRoleListURL                = "/getRoleList";
const deleteRoleDataURL             = "/deleteRoleData/:roleId";
const createRoleDataURL             = "/createRoleData";
const updateRoleData                = "/updateRoleData";

module.exports = {

    PropertiesFilePath : PropertiesFilePath,
    Headers : Headers,

    //All Query Services
    getDistinctThreadURL       : getDistinctThreadURL,
    getClassNameURL            : getClassNameURL,
    getDistinctLogTypeURL      : getDistinctLogTypeURL,
    getMethodNameURL           : getMethodNameURL,
    getDocumentOnThreadNameURL : getDocumentOnThreadNameURL,
    getThreadBetweenRangeURL   : getThreadBetweenRangeURL,

    //User Management
    getUserListURL    : getUserListURL,
    deleteUserDataURL : deleteUserDataURL,
    createUserDataURL : createUserDataURL,
    updateUserDataURL : updateUserDataURL,

    //Role Management
    getRoleListURL    : getRoleListURL,
    deleteRoleDataURL : deleteRoleDataURL,
    createRoleDataURL : createRoleDataURL,
    updateRoleData    : updateRoleData

};
