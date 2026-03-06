import { describe, expect, it } from 'vitest';
import { validateEAN } from '../validateEAN';

describe('validateEAN', () => {
    it('deve retornar true para EAN-13 válido', () => {
        expect(validateEAN('9783161484100')).toBe(true);
    });
    it('deve retornar false para EAN-13 inválido', () => {
        expect(validateEAN('97831614841013')).toBe(false);
    });

});