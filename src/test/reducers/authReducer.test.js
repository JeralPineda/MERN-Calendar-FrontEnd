import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

const initState = {
   checking: true,
   //    uid: null,
   //    name: null,
};

describe('Pruebas en authReducer', () => {
   test('debe de retornar el estado por defecto', () => {
      const action = {};

      const state = authReducer(initState, action);

      expect(state).toEqual(initState);
   });

   test('debe de autenticar el usuario', () => {
      const action = {
         type: types.authLogin,
         payload: {
            uid: '123',
            name: 'Jeral',
         },
      };

      const state = authReducer(initState, action);

      expect(state).toEqual({ checking: false, uid: '123', name: 'Jeral' });
   });

   test('debe de cerrar sesión', () => {
      const action = {
         type: types.authLogout,
      };

      const state = authReducer(initState, action);

      expect(state).toEqual({ checking: false });
   });
});
