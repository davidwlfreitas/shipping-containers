import {
  TYPES
} from '../../app/store/types';

export const getters = {
  [`${TYPES.modules.CORE}/${TYPES.getters.GET_ACCOUNT}`]: () => {
    return {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQpnP7GiOhzVJYBaEtVZJUx8IelpEHuIHQch8qnqI2GvE5zydiK&usqp=CAU',
      firstName: 'John',
      lastName: 'Doe',
      email: 'test@gmail.com',
    };
  },
  [`${TYPES.modules.CORE}/${TYPES.getters.GET_LAYOUT_DIRECTION}`]: () => {
    return null;
  },
};