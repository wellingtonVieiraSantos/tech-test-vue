import { validateImg } from '../validateImg';

describe('validateImg', () => {
    it('deve retornar true para URL de imagem válida', () => {
        expect(validateImg('https://example.com/image.jpg')).toBe(true);
    });
    it('deve retornar false para URL de imagem inválida', () => {
        expect(validateImg('https://example.com/image')).toBe(false);
    });
});