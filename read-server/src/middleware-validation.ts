import Joi from 'joi';

export const saveUser = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  address: Joi.string().min(5).max(50).required(),
  age:  Joi.number().integer().min(20).required(),
  isAdmin: Joi.boolean().required()
//   repeat_password: Joi.ref('password'),
});

    // newUser.name= "abc";
    // newUser.age= 20;
    // newUser.address= "new place";
    // newUser.isAdmin= false;

export const userLoginSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(3).max(30).required(),
    // password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  //   repeat_password: Joi.ref('password'),
  });
export const getUser = Joi.object({
    user_id: Joi.string().required(), // .integer().required(),

})