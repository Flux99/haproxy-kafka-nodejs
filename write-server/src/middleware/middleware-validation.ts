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
export const updateUser = Joi.object({
    user_id: Joi.string().required(), // .integer().required(),
    data: Joi.object({
        address: Joi.string().min(5).max(50),
        age:  Joi.number().integer().min(20),
        isAdmin: Joi.boolean()
    })
})

export const product = Joi.object({
    name:Joi.string().required(),
    price:Joi.number().integer().min(1).required()
}) 
export const createCatalogSchema = Joi.object({
    // seller_id:Joi.number().integer().min(1).required(),
    catalog_name:Joi.string().required(),
    products: Joi.array().items(product),
    user: Joi.object({user_id: Joi.number().integer().min(1), iat: Joi.number().integer(), exp: Joi.number().integer()})
})

export const createOrder = Joi.object({
    seller_id:Joi.number().integer().min(1).required(),
    products: Joi.array().items({id: Joi.number().integer().min(1)}),
    user: Joi.object({user_id: Joi.number().integer().min(1), iat: Joi.number().integer(), exp: Joi.number().integer()})
})