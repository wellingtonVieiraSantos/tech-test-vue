import { validateName } from '../validateName';

describe('validateName', () => {
    it('deve retornar true para nome válido', () => {
        expect(validateName('Teste de produto')).toBe(true);
    });
    it('deve retornar false para nome inválido', () => {
        expect(validateName('A')).toBe(false);
    });
});