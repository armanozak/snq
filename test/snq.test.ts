import snq from '../src/snq';

interface Price {
  amount: number;
  currency: string;
  symbol?: string;
}

interface Product {
  id: number;
  name: string;
  inStock: boolean;
  price?: {
    final: Price;
    original?: Price;
  };
}

describe('snq', () => {
  const product = {
    id: 10001,
    name: 'Test Product',
    inStock: true,
    price: {
      final: {
        amount: 9.99,
        currency: 'USD',
      },
    },
  } as Product;
  const list = [product];

  it('should return values when no error', () => {
    expect(snq(() => product.id)).toBe(10001);
    expect(snq(() => product.name)).toBe('Test Product');
    expect(snq(() => product.inStock, false)).toBe(true);
    expect(snq(() => product.price.final.amount)).toBe(9.99);
    expect(snq(() => product.price.final.currency, 'EUR')).toBe('USD');
  });

  it('should return undefined when TypeError', () => {
    expect(snq(() => product.price.original)).toBeUndefined();
  });

  it('should return undefined when TypeError (array)', () => {
    expect(snq(() => list[1].price.final.currency)).toBeUndefined();
  });

  it('should return default value when TypeError', () => {
    expect(snq(() => product.price.original.symbol, '$')).toBe('$');
  });

  it('should return default value when TypeError (array)', () => {
    expect(snq(() => list[1].price.final.currency, 'EUR')).toBe('EUR');
  });

  it('should throw any error except TypeError', () => {
    const expected = 'Some Error';

    function snqThatThrowsError() {
      snq(() => {
        throw expected;
      });
    }

    expect(snqThatThrowsError).toThrow(expected);
  });
});
